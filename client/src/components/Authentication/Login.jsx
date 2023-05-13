import React, { useState } from "react";
import {
  Button,
  WrapItem,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setTabIndex }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passHide, setPassHide] = useState(true);
  const toast = useToast();
  const navigatePageTo = useNavigate();

  const handleSubmit = async () => {
    const formData = {
      email,
      password,
    };
    console.log(`🚀 ~> file: Login.jsx:28 ~> handleSubmit ~>`, formData);
    const URL = "http://127.0.0.1:3007/api/auth/login";

    try {
      const response = await axios.post(URL, formData, {
        headers: { type: "application/json" },
      });
      console.log("response: ", response);
      toast({
        title: `Congratulations ${response.data.payload.name.toUpperCase()}! You're in. `,
        description: `The fun is just beginning`,
        status: "success",
        duration: 7000,
        isClosable: true,
      });
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.payload));
      navigatePageTo("/");
    } catch (error) {
      console.log("error: ", error);
      if (error.response.status == 409) {
        console.log("index changes");
        setTabIndex((prevState) => 0);
      }
      toast({
        title: error.response.data,
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <VStack>
        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="Email address"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormControl>
        <InputGroup size="md">
          <FormControl isRequired>
            <FormLabel>Enter your password</FormLabel>
            <Input
              pr="4.5rem"
              type={passHide ? "password" : "text"}
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => {
                setPassHide(!passHide);
              }}
            >
              {passHide ? "Show" : "Hide"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <WrapItem>
          <Button colorScheme="messenger" type="submit" onClick={handleSubmit}>
            Login
          </Button>
        </WrapItem>
      </VStack>
    </>
  );
};

export default Login;
