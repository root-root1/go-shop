import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    navbar: {
        backgroundColor: '#203040',
        '& a': {
            color: '#ffffff',
            marginLeft: 10
        }
    },
    brand: {
        fontWeight: 'bold',
        fontSize: '1.5rem'
    },
    grow: {
        flexGrow: 1
    },
    main: {
        minHeight: '80vh'
    },
    footer: {
        marginTop: 10,
        textAlign: 'center'
    },

    cardFooter: {
        justifyContent: "space-between",
        margin: 10
    },
    card: {

        margin: 5
    },
    section: {
        marginTop: 10,
        marginBottom: 10
    },
    form: {
        maxWidth: 800,
        margin: "0 auto"
    },
    navbarButton: {
        marginBottom: 8,
        fontSize: 20,
        color: "#ffffff",
        textTransform: 'initial'
    },
    link: {
        margin: 10,
        fontSize: 20
    },
    transparentBackground: {
        backgroundColor: 'transparent'
    }
})

export default useStyles;
