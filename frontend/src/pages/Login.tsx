import React, {useState} from 'react';
import {useAuth} from "../services/AuthProvider";
import {Navigate, useNavigate} from "react-router-dom";
import {Box, grommet, Grommet, FormField, TextInput, Button, Text} from "grommet";


const Login: React.FC = () => {

    const {isAuthenticated, authenticationError, login} = useAuth();
    const navigate = useNavigate()
    const [newUsername, setNewUsername] = useState<string>();
    const [newPassword, setNewPassword] = useState<string>();

    const handleLogin = () => {
        login && login(newUsername, newPassword);
    }

    const routeToRegister = () => {
        console.log("register")
        return navigate("/register");
    }

    if (isAuthenticated) {
        return <Navigate to="/home"/>
    }

    return (

        <Grommet full theme={grommet}>
            <Box fill justify="center" align="center" gap="medium">

                <Box align="center" width="large" height="medium" pad="medium">
                    <Text size="xlarge" weight="bold" margin="medium">
                        Login
                    </Text>

                    <FormField>
                        <TextInput
                            placeholder="username"
                            value={newUsername}
                            onChange={event => setNewUsername(event.target.value)}
                        />
                    </FormField>


                    <FormField>
                        <TextInput
                            placeholder="password"
                            value={newPassword}
                            type="password"
                            onChange={event => setNewPassword(event.target.value)}
                        />
                    </FormField>

                    <Box direction="row" margin={{top: "medium"}}>
                        <Button primary label="Login"
                                margin={{horizontal: 'xsmall'}}
                                onClick={() => handleLogin()}
                        />
                        <Button primary label="Sign up"
                                margin={{horizontal: 'xsmall'}}
                                onClick={() => routeToRegister()}
                        />
                    </Box>

                    {
                        authenticationError &&
                        <Text size="large" weight="bold" margin="medium" color="red">
                            Your credentials are incorrect!
                        </Text>

                    }

                </Box>
            </Box>
        </Grommet>

    );
};

export default Login;
