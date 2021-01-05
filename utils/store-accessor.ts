import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import  SchemaModule  from '../store/SchemaModule'
import  data  from '../store/data'


let schemaStore: SchemaModule
let dataStore: data

function initialiseStores(store: Store<any>): void {
  schemaStore = getModule(SchemaModule, store);
  dataStore = getModule(data, store);
}

export { initialiseStores, schemaStore, dataStore }