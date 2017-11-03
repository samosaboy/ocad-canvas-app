import Colors from './Colors'
import Fonts from './Fonts'

const Pages = {
  listContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderBottomColor: Colors.iosLight,
    borderTopColor: Colors.iosLight,
    paddingTop: 15,
    paddingBottom: 15
  },
  itemHeader: {
    paddingLeft: 10
  },
  headerTitle: {
    fontWeight: '600'
  },
  date: {
    color: Colors.lightGrey,
    paddingTop: 5,
    paddingBottom: 5
  },
  subTitleText: {
    fontWeight: '400',
    color: Colors.charcoal
  },
  authorContainer: {
    borderBottomColor: Colors.iosLight,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    paddingLeft: 10,
    paddingRight: 10
  },
  author: {
    paddingLeft: 10
  },
  viewContainer: {
    backgroundColor: Colors.white,
    padding: 20
  },
  metaContainer: {
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.iosLight,
    marginTop: 20,
    marginBottom: 20
  },
  bodyTitle: {
    fontWeight: '600',
    fontSize: Fonts.size.regular
  },
  body: {
    paddingTop: 15
  }
}

export default Pages
