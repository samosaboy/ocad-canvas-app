import Colors from './Colors'
import Metrics from './Metrics'

const Containers = {
  messageContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.iosLight
    // paddingTop: 10,
    // paddingBottom: 10
  },
  mainContainer: {
    justifyContent: 'flex-start',
    // margin: Metrics.section,
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
    // backgroundColor: Colors.bloodOrange
  },
  noBorderContainer: {
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  authorContainer: {
    borderBottomColor: Colors.iosLight,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    paddingLeft: 10,
    paddingRight: 10
  },
  listContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderTopColor: Colors.iosLight,
    paddingTop: 15, // TODO: Check if this looks right
    paddingBottom: 15
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingRight: 10
  },
  subTitleText: {
    fontWeight: '400',
    color: Colors.charcoal
  },
  headerTitle: {
    fontWeight: '600'
  },
  labelTitle: {
    fontWeight: '600'
  },
  infoTitle: {
    alignSelf: 'flex-start',
    fontWeight: '500'
  },
  infoDesc: {
    alignSelf: 'flex-end'
  },
  heading: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10
  }
}

export default Containers
