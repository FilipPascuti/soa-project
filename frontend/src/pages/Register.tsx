import React, {useState} from 'react';
import {useAuth} from "../services/AuthProvider";
import {Navigate} from "react-router-dom";
import {Box, Button, FormField, grommet, Grommet, Text, TextInput} from "grommet";

const Register: React.FC = () => {

    const {isRegistered, register} = useAuth();

    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [fullName, setFullName] = useState<string>();
    const [notMatching, setNotMatching] = useState<boolean>(false);

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setNotMatching(true);
            return;
        }
        register && register(username, password, fullName);
    }

    if (isRegistered) {
        return <Navigate to="/login"/>
    }

    const checkPasswordMatch = (password: string, confirmPassword: string) => {
        if (password !== confirmPassword)
            setNotMatching(true);
        else
            setNotMatching(false);
    }

    return (
        <>

            <Grommet full theme={grommet}>
                <Box fill justify="center" align="center" gap="medium">

                    <Box align="center" width="large" height="large" pad="medium" margin={{top: "xlarge"}}>
                        <Text size="xlarge" weight="bold" margin="medium">
                            Register
                        </Text>

                        <FormField>
                            <TextInput
                                placeholder="username"
                                value={username}
                                onChange={event => setUsername(event.target.value)}
                            />
                        </FormField>

                        <FormField>
                            <TextInput
                                placeholder="full name"
                                value={fullName}
                                onChange={event => setFullName(event.target.value)}
                            />
                        </FormField>


                        <FormField error={notMatching ? "passwords not matching" : ""}>
                            <TextInput
                                placeholder="password"
                                value={password}
                                type="password"
                                onChange={event => {
                                    setPassword(event.target.value)
                                    checkPasswordMatch(event.target.value, confirmPassword || "")
                                }}
                            />
                        </FormField>

                        <FormField error={notMatching ? "passwords not matching" : ""}>
                            <TextInput
                                placeholder="confirm password"
                                value={confirmPassword}
                                type="password"
                                onChange={event => {
                                    setConfirmPassword(event.target.value)
                                    checkPasswordMatch(password || "", event.target.value)
                                }}
                            />
                        </FormField>

                        <Button primary label="Sign up"
                                margin="medium"
                                size="large"
                                onClick={() => handleRegister()}
                        />


                    </Box>
                </Box>
            </Grommet>

        </>

    );
};

export default Register;
