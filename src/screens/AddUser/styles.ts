import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },

  close: {
    marginTop: 10,
    marginBottom: 20,
  },
  closeText: {
    fontSize: 20,
    color: '#2F80ED',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
  },
  field: {
    marginBottom: 28,
  },
  label: {
    fontSize: 14,
    color: '#999',
    marginBottom: 6,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 8,
    fontSize: 16,
  },
  roleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    borderRadius: 28,
    padding: 4,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  roleActive: {
    backgroundColor: '#EAF2FF',
    borderWidth: 1,
    borderColor: '#2F80ED',
  },
  roleText: {
    fontSize: 15,
    color: '#666',
    textTransform:'capitalize'
  },
  roleTextActive: {
    color: '#2F80ED',
    fontWeight: '600',
  },
  button: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 30,
    backgroundColor: '#2F80ED',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;
