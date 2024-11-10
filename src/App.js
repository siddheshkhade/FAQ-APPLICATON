import React, {useState, useRef, useEffect} from 'react'
import {ChakraProvider , theme } from '@chakra-ui/react'
import { Navbar } from './Navbar'
import { Faq } from './Faq'
import alanBtn from "@alan-ai/alan-sdk-web";
import {scroller} from "react-scroll"

export const App = () => {
  

const alanBtnInstance = useRef(null);
const [index, setIndex] = useState(null)
const [currentFaqId, setCurrentFaqId] = useState(null);
const [toggleColorFlag, setToggleColorFlag] = useState(false);


useEffect(() => {
  if (!alanBtnInstance.current) {
    alanBtnInstance.current = alanBtn({
      key: "807db37e0bdf2963a731022c09c6c63f2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === 'gotoFaq') {
          // eslint-disable-next-line no-template-curly-in-string
          scroller.scrollTo('accordion-item-${commandData.faqId}',{
            duration:800,
            delay:0,
            smooth: 'easeInOutQuart'

          });

          
          // Call the client code that will react to the received command
          setIndex(commandData.faqId - 1)
          setCurrentFaqId(commandData.faqId);

        } else if (commandData.command ==="toggleColorMode") {
          setToggleColorFlag(flag => !flag);
        }
      },
    });
  }
}, []);

  return (
    <ChakraProvider theme = {theme}>
        <Navbar toggleColorFlag= {toggleColorFlag}/>
        <Faq 
        index = {index} 
        setIndex = {setIndex} 
        currentFaqId={currentFaqId}
        setCurrentFaqId={setCurrentFaqId}
        />

    </ChakraProvider>
  )
}
