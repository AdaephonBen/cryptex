import NavBar from "./Navbar";
import { Box } from "@mui/system";

export default function Levels() {
    return (
        <Box
        display='flex'
        flex='1'
        flexDirection='column'
        justifyContent='space-around'
        alignItems='center'
        height='100vh'
        >
            <NavBar />
            <Box
            width='100%'
            display='flex'
            flex='1'
            justifyContent='center'
            alignItems='center'
            >
                
            </Box>
        </Box>
    );
}