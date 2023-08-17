import { StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import { scaleSize } from '../../constants/mixin';


export const STATUSBAR_HEIGHT = Constants.statusBarHeight;

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: '#2196F3',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === "android" ? STATUSBAR_HEIGHT + scaleSize(20) : STATUSBAR_HEIGHT + scaleSize(10),
        paddingBottom: scaleSize(10),
    },
    headerTitle: {
        color: 'white',
        fontSize: scaleSize(18),
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: scaleSize(20)
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: scaleSize(20)
    },
    typingContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerTypingText: {
        color: 'white',
        marginTop: scaleSize(10)
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e2e2e2',
        padding: scaleSize(10),
        paddingBottom: Platform.OS === 'ios' ? scaleSize(20) : scaleSize(10),
    },
    input: {
        flex: 1,
        backgroundColor: '#e9e9e9',
        padding: scaleSize(10),
        borderRadius: scaleSize(20),
        marginRight: scaleSize(10)
    },
    userMessageContainer: {
        alignSelf: 'flex-end',
        marginBottom: scaleSize(10),
        marginRight: scaleSize(10),
        marginLeft: scaleSize(40),
        borderRadius: scaleSize(15),
        padding: scaleSize(10),
        backgroundColor: '#2196F3'
    },
    machineMessageContainer: {
        alignSelf: 'flex-start',
        marginBottom: scaleSize(10),
        marginLeft: scaleSize(10),
        marginRight: scaleSize(40),
        borderRadius: scaleSize(15),
        padding: scaleSize(10),
        backgroundColor: '#e9e9e9'
    },
    userMessage: {
        color: 'white',
        fontSize: scaleSize(16)
    },
    machineMessage: {
        color: 'black',
        fontSize: scaleSize(16)
    },
    sendButton: {
        alignSelf: 'center'
    },

    // Type Indicator

    typingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTypingText: {
        color: 'white',
        marginRight: scaleSize(5)
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: scaleSize(25)
    },
    dot: {
        width: scaleSize(5),
        height: scaleSize(5),
        backgroundColor: 'white',
        borderRadius: scaleSize(2.5),
        marginHorizontal: scaleSize(2)
    }
});