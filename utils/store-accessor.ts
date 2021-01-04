import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import  SchemaModule  from '../store/SchemaModule'
import  data  from '../store/data'


let exampleStore: SchemaModule
let dataStore: data

function initialiseStores(store: Store<any>): void {
  exampleStore = getModule(SchemaModule, store);
  dataStore = getModule(data, store);
}

export { initialiseStores, exampleStore, dataStore }