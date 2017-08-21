import Colors from './Colors'
import Metrics from './Metrics'

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
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    alignItems: 'center'
  },
  homeContainer: {
    marginLeft: Metrics.section,
    marginRight: Metrics.section,
    marginTop: Metrics.section,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    flex: 0.5
  }
}

export default Containers
