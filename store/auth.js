const initState = () => ({
    user: null,
    profile: null,
    loading: true
});

export const state = initState

const ROLES = {
    MODERATOR: "Mod"
}


export const getters = {
    authenticated: state => !state.loading && state.user != null,
    moderator: (state, getters) => getters.authenticated && state.user.profile.role === ROLES.MODERATOR,
}

export const mutations = {
    saveUser(state, { user }) {
        state.user = user
    },
    saveProfile(state, { profile }) {
        state.profile = profile
    },
    finish(state) {
        state.loading = false
    }
}

export const actions = {
    initialize({ commit }) {
        return this.$auth.querySessionStatus()
            .then(sessionStatus => {
                if (sessionStatus) {
                    return this.$auth.getUser();
                }
            }).then(async (user) => {
                if (user) {
                    commit('saveUser', { user });
                    // console.log("User from Storage", user);
                    this.$axios.setToken(`Bearer ${user.access_token}`);
                    const profile = await this.$axios.get('https://localhost:5001/api/users/me');
                    commit('saveProfile', { profile })
                }
            })
            .catch(err => {
                console.log(err.message)
                if (err.message === "login_required") {
                    return $auth.removeUser();
                }
            })
            .finally(() => commit('finish'))
    },
    _watchUserLoaded({ state, getters }, action) {
        if (process.server) return;
        
        return new Promise(async (resolve, reject) => {
            if (state.loading) {
                console.log("start watching")
                const unwatch = this.watch(
                    (s) => s.auth.loading,
                    (n, o) => {
                        if (!getters.authenticated) {
                            this.$auth.signinRedirect();
                        } else if(!n) {
                            console.log("user finished loading executing action")
                            resolve(action());
                        }
                        unwatch();
                    }
                )
            } else {
                console.log("user is already loaded");
                resolve(action());
            }
        })
    }
}