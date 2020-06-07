import React from "react";
import Navbar from "../Navbar/Navbar";
import { FaAngleLeft,FaAngleRight,FaSearch } from "react-icons/fa";
import {Flex, 
    Box,
    Text,
    Divider,
    Stack,
    Input,
    FormControl,
    IconButton,
    Heading} from "@chakra-ui/core"
import "./styles.css"
import { icons } from "react-icons/lib/cjs";

class Table extends React.Component {
    render(){
        return(
                <table className="table">
                    <tr>
                        <th>Rank</th>
                        <th>Team</th>
                        <th>Level</th>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>adaephonben</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>adaephonben</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>adaephonben</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>adaephonben</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>ChilledMustang</td>
                        <td>20</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>adaephonben</td>
                      <td>20</td>
                    </tr>
                    <tr>
                       <td>3</td>
                       <td>adaephonben</td>
                       <td>20</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>adaephonben</td>
                      <td>20</td>
                    </tr>
                    <tr>
                       <td>3</td>
                       <td>adaephonben</td>
                       <td>20</td>
                    </tr>
                </table>
        );
    }
}

export default class Leaderboard extends React.Component {
    render(){
        return (
            <section className="page">
            <Navbar/>
            <Flex align="center" justify="space-between" flexDirection="column" className="leaderboard">
            <Heading marginTop="1.5rem" className="heading">
                L E A D E R B O A R D
                <Divider />
            </Heading>
            <Flex className="filters">
                <FormControl>
                    <Input placeholder="Team/User Name" size="sm"/>
                </FormControl>
                <IconButton icon={FaSearch} size="sm"/>
            </Flex>
             <Table />
             <Box className="paginator">
                 
             <IconButton icon={FaAngleLeft} size="sm"/>
              &nbsp;Page 1 of 20&nbsp;
             <IconButton icon={FaAngleRight} size="sm"/>

            </Box>
           
            </Flex>
            </section>
        );
    }
}