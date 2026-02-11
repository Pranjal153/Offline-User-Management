import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    paddingHorizontal: 16,
  },
  isLoadingStyle:{
backgroundColor:'blue'
  }, 
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    borderRadius: 24,
    padding: 4,
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: 12,
  },
  tabWrapper: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  tabActive: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#2F80ED',
  },

  tabText: {
    fontSize: 14,
    color: '#666',
  },

  tabTextActive: {
    color: '#2F80ED',
    fontWeight: '600',
  },
  sectionText: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    width: '100%',
  },
  row1: {
    flexDirection: 'row',
    position:'absolute',
    right:10
  },
  avatarWrapper: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#EAF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F80ED',
  },
  nameText: {
    flex: 1,
    fontSize: 15,
    color: '#111',
  },
  roleText: {
    fontSize: 13,
    color: '#999',
  },
  deleteText: {
    fontSize: 13,
    color: '#8e1a1aff',
    marginLeft: 12
  },
  editText: {
    fontSize: 13,
    color: '#2F80ED',
  },
  fabBtn: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#2F80ED',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  plusIcon: {
    fontSize: 40,
    color: '#FFF',
    textAlign: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 8,
    marginTop: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    marginHorizontal: 8,
    paddingVertical: 0,
  },
});

export default styles;
