import React from "react";
import {
  Flex,
  Box,
  Heading,
  Divider,
  OrderedList,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import "./styles.css";

function Rules() {
  return (
    <Box className="container">
      <Flex flexDirection="column" justify="space-between" align="center">
        <Flex flexDir="column">
        <Heading letterSpacing={[3, 7, 8]} fontWeight={[520, 600, 600]}>
          RULES AND GUIDELINES
        </Heading>
        <Divider />
          </Flex>
        <Flex
          flexDirection="column"
          align="center"
          justify="space-between"
          maxWidth="80%"
        >
          <Heading paddingBottom="10px"> Rules</Heading>
          <OrderedList spacing={2}>
            <ListItem>
              Cryptex 2021 consists of 27 levels of generally increasing
              difficulty. You will receive successive questions upon solving and
              entering the answer of each level and/or completing the task
              involved.
            </ListItem>
            <ListItem>
              The winner will be the first person to complete all the levels. In
              case no one completes Cryptex before 2359 IST 7th March 2021, the
              person occupying the first position on the leaderboard will be
              declared the winner.
            </ListItem>
            <ListItem>
              The competition is open to everyone, anywhere on the globe.
            </ListItem>
            <ListItem>
              We will provide a platform to communicate with the moderators and
              ask for hints. Using any platform to disclose questions/solutions
              will result in instant disqualification.
            </ListItem>
            <ListItem>
              If a question involves typing answers in an answer box, the
              answers should be typed completely in lowercase, without any
              spaces, punctuation, special characters or numerals. The only
              exception to this is when the answer is a numeral greater than
              1000 or when the answer is a special character. Examples:
              <UnorderedList>
                <ListItem>
                  If your answer is American Pie, type americanpie
                </ListItem>
                <ListItem>
                  If your answer is Just 4 Laughs, type justfourlaughs
                </ListItem>
                <ListItem>If your answer is 42069, type 42069</ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              The questions may also involve interacting with the page itself,
              following hyperlinks etc. Nothing is as it seems.
            </ListItem>

            <ListItem>
              Any attempt to access levels you have not yet reached or any form
              of attack on the servers will result in disqualification.
            </ListItem>
            <ListItem>The organizer’s decision is final in any case.</ListItem>
            <ListItem>
              TL;DR: Have fun. Enter answers only in lowercase alphabet without
              spaces except in certain special cases.
            </ListItem>
          </OrderedList>
        </Flex>
        <Flex
          flexDirection="column"
          align="center"
          justify="space-between"
          maxWidth="80%"
        >
          <Heading paddingBottom="10px">Guidelines</Heading>
          <OrderedList spacing={2}>
            <ListItem>
            We STRONGLY recommend using a laptop for solving Cryptex. 
            Some of the questions may not be properly formatted on a mobile device, and you may miss key elements of a question.
            </ListItem>
            <ListItem>
              Google is your friend. Usually. You’re expected to use Google and
              other online tools in your quest to crack Cryptex 2021. Do keep in
              mind that Google may give you erroneous results in certain cases.
            </ListItem>
            <ListItem>
              Reverse searching images might help you in certain cases.
              Extensions such as Huntress helps.
            </ListItem>

            <ListItem>
              The questions are open-ended, may have red herrings, cheeky hints
              and may lead you on wild goose chases. If you are getting nowhere
              with a certain approach, do consider that you might be on the
              wrong train of thought.
            </ListItem>

            <ListItem>
              On the other hand, it could be that the answer is ‘colour’ when
              you have been trying ‘color’. Check for alternate spelling, names
              and other such variations.
            </ListItem>
            <ListItem>
            Some questions are audio based.If a question doesn’t make sense right away, 
            try unmuting your device and loading the page again.
            </ListItem>
            <ListItem>
              Clues might be hidden (especially in the first few questions) to
              reduce wrong trains of attack. Their absence, however, does not
              indicate anything.
            </ListItem>

            <ListItem>
              Hints to the questions will be released on the forum at the
              moderator’s discretion. They’ll generally be released in multiples
              of 15 minutes starting from 1830 hrs 5th March. However, don’t
              expect this to be strictly enforced. The hints and even the titles
              of the question may not have any apparent meaning until you figure
              out the answer and/or receive another part of the clue.
            </ListItem>

            <ListItem>
              The forum is the quickest way to reach the moderators of Cryptex.
              You may ask for hints on the forum.
            </ListItem>

            <ListItem>
              The questions might involve simple cryptography, wordplay,
              steganography, conventional puzzles or maybe simple connect
              questions. However, each of them is designed to be solved in a
              reasonable amount of time with access to just the internet and
              pen+paper.
            </ListItem>
          </OrderedList>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Rules;
