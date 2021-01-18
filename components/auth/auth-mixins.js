export const guard = () => ({
    beforeRouteEnter (to, from, next) {
        if(process.server){
            // console.log("SERVER");
            next();
        } else {
            // console.log("BROWSER");
            next(nuxt =>{
                console.log(nuxt);
            });
        }

       
    }
});