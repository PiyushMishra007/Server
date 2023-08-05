import { useContext } from 'react';

import { Dialog, Typography, List, ListItem, Box, styled } from '@mui/material';

import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

import { addUser } from '../../service/api';
import { AccountContext } from '../../context/AccountProvider';
import { qrCodeImage } from '../../constants/data';


// const Component = styled(Box)`
//     display: flex; 
// `;

const Container = styled(Box)`
    padding: 56px 0 56px 56px;
`;

const QRCOde = styled('img')({
    margin: 'auto',
    height: 200,
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
});

const Title = styled(Typography)`
    font-size: 36px;
    margin-bottom: 25px;
    text-align:center;
    color:#5D54A4;
    font-family: 'Borel', cursive;
    font-family: 'Josefin Sans', sans-serif;
    font-family: 'REM', sans-serif;

`;


const StyledList = styled(List)`
    &  > li {
        padding: 0;
        margin-top: 15px;
        font-size: 18px;
        line-height: 28px;
        color: #4a4a4a;
    }
`;
const Glogin=styled(Typography)`
        font-size: 26px;
        text-align:center;
        
        font-family: Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif;
        font-family: 'Josefin Sans', sans-serif;
        font-family: 'REM', sans-serif;
        font-weight: 300;
        color: #525252;
        
`;


const dialogStyle = {
    marginTop: '12%',
    marginBottom: '12%',
    height: '75%',
    width: '60%',
    maxWidth: '100',
    maxHeight: '100%',
    borderRadius: 0,
    boxShadow: 'none',
    overflow: 'hidden',
    borderRadius:'25px'
}

const LoginDialog = () => {

    const { setAccount,showloginButton, setShowloginButton, setShowlogoutButton } = useContext(AccountContext);

    const onLoginSuccess = async (res) => {
        let decoded = jwt_decode(res.credential);
        setAccount(decoded);//passing user data to api
        setShowloginButton(false);
        setShowlogoutButton(true);
        await addUser(decoded);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    // const onSignoutSuccess = () => {
    //     alert("You have been logged out successfully");
    //     console.clear();
    //     setShowloginButton(true);
    //     setShowlogoutButton(false);
    // };

    return (
        <Dialog
            open={true}
            BackdropProps={{style: {backgroundColor: 'unset'}}}
            maxWidth={'md'}
            PaperProps={{ sx: dialogStyle }}
        >
            <Box>
                <Container>
                    <Title>Chit-Chat</Title>
                    <QRCOde src={qrCodeImage} alt="QR Code" />
                    <Glogin>Login using Google Accounts</Glogin>
                    {/* <StyledList>
                        <ListItem>1. Open WhatsApp on your phone</ListItem>
                        <ListItem>2. Tap Menu Settings and select WhatsApp Web</ListItem>
                        <ListItem>3. Point your phone to this screen to capture the code</ListItem>
                    </StyledList> */}
                    
                </Container>
                <Box style={{position:'relative'}}>
                    
                    <Box style={{position: 'absolute', top: '50%', transform: 'translateX(25%) translateY(-25%)',marginLeft:'30%'}}>
                        { showloginButton ?
                            <GoogleLogin
                                buttonText=""
                                onSuccess={onLoginSuccess}
                                onError={onLoginFailure}
                            /> : null}
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}

export default LoginDialog;