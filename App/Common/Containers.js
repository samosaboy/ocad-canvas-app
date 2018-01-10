import Colors from './Colors'
import { height } from 'react-native-dimension'

const Containers = {
  loginContainer: {
    height: height(100),
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'stretch',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  messageContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.basicallyWhite,
    paddingTop: 10,
    paddingBottom: 10
  },
  noBorderContainer: {
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  authorContainer: {
    marginLeft: 10,
    borderBottomColor: Colors.iosLight,
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  listContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.basicallyWhite,
    paddingTop: 10,
    paddingBottom: 10
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
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomColor: Colors.borderLight,
    borderLeftColor: Colors.borderLight,
    borderRightColor: Colors.borderLight,
    borderTopColor: Colors.borderLight,
    borderRadius: 30,
    marginRight: 10,
    marginLeft: 10
  },
  dropDownContainer: {
    backgroundColor: Colors.basicallyWhite,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 30
  }
}

export default Containers
