import React, {useEffect, useState} from 'react';
import {useAuth} from "../services/AuthProvider";
import {useNavigate} from "react-router-dom";
import {createTicket, getTickets} from "../services/userApi";
import {Ticket} from "../services/ticket";
import {
    Anchor,
    Box,
    Button,
    Card, CardBody, CardHeader,
    FormField,
    grommet,
    Grommet,
    NameValueList,
    Nav,
    Select,
    Text,
    TextInput,
    NameValuePair, FileInput, DataTable, Meter
} from "grommet";
import {Logout} from "grommet-icons"

const Home: React.FC = () => {
    const {email, logout, token} = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const handleCreate = async () => {
        console.log(token, {title, content})
        const result = await createTicket(token, {title, content});
        console.log(result)
        fetchTickets()
    }
    const handleLogout = () => {
        logout && logout();
        navigate("/");
    }

    useEffect(() => {

        fetchTickets()
    }, [])

    const [tickets, setTickets] = useState<Ticket[]>()
    const fetchTickets = async () => {
        console.log(token)
        let fetchedTickets = (await getTickets(token))?.tickets
        console.log(fetchedTickets)
        setTickets(fetchedTickets)
    }
    // john@gmail.com
    console.log(tickets);

    return (

        <Grommet full theme={grommet}>

            <Nav direction="row" background="brand" pad="medium">
                <Anchor label="Logout" icon={<Logout/>} alignSelf="end" onClick={() => handleLogout()}/>
            </Nav>
            <Text size="xlarge" weight="bold" margin="medium">
                Welcome to the home page {email}
            </Text>

            <Box fill justify="center" align="center" gap="medium">

                <Box align="center" width="large" height="large" pad="medium" margin={{top: "xlarge"}}>

                    <FormField>
                        <TextInput
                            placeholder="title"
                            value={title}
                            onChange={event => setTitle(event.target.value)}
                        />
                    </FormField>

                    <FormField>
                        <TextInput
                            placeholder="content"
                            value={content}
                            onChange={event => setContent(event.target.value)}
                        />
                    </FormField>

                    <Button primary label="Add ticket"
                            margin="medium"
                            size="large"
                            onClick={() => handleCreate()}
                    />
                    {/*<Button primary label="Fetch"*/}
                    {/*        margin="medium"*/}
                    {/*        size="large"*/}
                    {/*        onClick={() => fetchTickets()}*/}
                    {/*/>*/}

                    <DataTable
                        columns={[
                            {
                                property: 'name',
                                header: <Text>Title</Text>,
                                render: ticket => (<span>{ticket.title}</span>)
                            },
                            {
                                property: 'title',
                                header: 'Content',
                                render: ticket => (
                                    <span>{ticket.content} </span>
                                ),
                            },
                        ]}
                        data={tickets}
                    />


                </Box>
            </Box>






        </Grommet>


    );
};

export default Home;
