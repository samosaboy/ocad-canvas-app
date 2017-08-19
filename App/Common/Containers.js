import Colors from './Colors'
import Metrics from './Metrics'

const Containers = {
  mainContainer: {
    flex: 1,
    margin: Metrics.section,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  section: {
    margin: Metrics.section,
    padding: Metrics.baseMargin,
    backgroundColor: Colors.transparent,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    paddingTop: Metrics.baseMargin,
    backgroundColor: Colors.transparent
  },
  centeredContainer: {
    flex: 1,
    paddingTop: Metrics.baseMargin,
    backgroundColor: Colors.transparent
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  homeContainer: {
    flex: 1,
    margin: Metrics.section,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000'
  }
}

export default Containers
