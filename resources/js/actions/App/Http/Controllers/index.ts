import AssetController from './AssetController'
import Settings from './Settings'
const Controllers = {
    AssetController: Object.assign(AssetController, AssetController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers