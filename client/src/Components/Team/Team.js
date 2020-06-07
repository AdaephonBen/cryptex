import React from "react";
import Navbar from "../Navbar/Navbar";
import {
    Flex,
    Heading,
    Avatar,
    AvatarBadge,
    Progress,
} from "@chakra-ui/core"

export default class Team extends React.Component {
    render(){
        return (
            <section>
            <Navbar/>
            <Flex>
            </Flex>
            <Flex>
            <Avatar name="Foo Bar" />
            <Avatar name="Ronald Roe"/>
            <Avatar name="Jane Doe"/>
            </Flex>
            </section>
        )
    }
}