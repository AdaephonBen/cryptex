import React from "react";
import "./styles.css";
import {
    Flex,
    Box,
    Heading,
    Avatar,
    Progress,
    Divider,
} from "@chakra-ui/react"
import Navbar from "../Navbar/Navbar";

function Team () {
    return (
        <section>
        <Navbar/>
        <Flex className="body" flexDirection="column">
        <Flex flexDirection="row" className="about">
        <Avatar name="Lambda IITH" size="lg"/>
        <Box>
            <p>
            &nbsp;Lambda IIT H
            </p>
            <Divider/>
            &nbsp;Password:Blahblah
        </Box>
        </Flex>
        <Heading size="md" className="dividingHeader">Progress</Heading>
        <Divider/>
            <Flex className="progress">
                <Box>
                    Track 1
                    <Progress value={50}/>
                </Box>
                <Box>
                    Track 2
                    <Progress value={70}/>
                </Box>
                <Box>
                    Track 3
                <Progress value={60}/>
                </Box>
                <Box>
                    Track 4
                <Progress value={80}/>
                </Box>
            </Flex>
            <Heading size="md" className="dividingHeader">
                Team Members
            </Heading>
            <Divider/>
        <Flex className="members">
            <table className="table">
                <tr>
                    <th>Name</th>
                    <th>UserName</th>
                    <th>Questions Solved</th>
                </tr>
                <tr>
                    <td>Vishnu VS</td>
                    <td>adaephonben</td>
                    <td>20</td>
                </tr>
                <tr>
                    <td>Ronald Roe</td>
                    <td>chilledMustang</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>Nikhil Reddy</td>
                    <td>npalladium</td>
                    <td>20</td>
                </tr>
                <tr>
                    <td>Tanmay Renugunta</td>
                    <td>StrangeAmeoba</td>
                    <td>20</td>
                </tr>
            </table>
        </Flex>
        </Flex>
        </section>
    )
}

    export default Team;
