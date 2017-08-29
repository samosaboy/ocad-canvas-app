import Colors from './Colors'
import Metrics from './Metrics'
// import { width, height, totalSize } from 'react-native-dimension'

const Containers = {
  mainContainer: {
    justifyContent: 'flex-start',
    margin: Metrics.section,
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  },
  section: {
    backgroundColor: Colors.transparent,
    padding: Metrics.baseMargin,
    margin: Metrics.section,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
    paddingTop: Metrics.baseMargin
  },
  centeredContainer: {
    flex: 1,
    backgroundColor: Colors.transparent,
    paddingTop: Metrics.baseMargin
  },
  groupContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  homeContainer: {
    backgroundColor: Colors.white,
    paddingLeft: Metrics.smallMargin,
    paddingRight: Metrics.smallMargin,
    paddingTop: Metrics.smallMargin
  },
  noBorderContainer: {
    borderBottomWidth: 0,
    borderTopWidth: 0
  }
}

export default Containers
