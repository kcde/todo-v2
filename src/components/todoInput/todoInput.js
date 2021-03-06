import React, { useRef, useState } from 'react';
import { Box, Flex, Input, useColorModeValue } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';
const TodoInput = ({ disableInput }) => {
  const userId = useSelector((state) => state.authId);
  const [textValue, setTextValue] = useState('');
  const inputBox = useRef();
  const focusHandler = () => {
    inputBox.current.focus();
  };

  const caretColor = 'hsl(220, 98%, 61%)';
  const color = useColorModeValue('todoBlue.700', 'todoGray.100');

  const submitHandler = (e) => {
    e.preventDefault();
    // const new_todo = { id: Date.now().toString(), task: textValue, completed: false };
    // dispatch(actions.add_todo(new_todo));
    add_todo();
    setTextValue('');
  };

  const add_todo = (todo, id) => {
    //create todo object {task, id,completed}
    const new_todo = { id: Date.now().toString(), task: textValue, completed: false };

    // get userDoc
    const userDoc = doc(db, 'users', userId);
    updateDoc(userDoc, {
      lists: arrayUnion(new_todo),
    });

    //save todo to user specific account
  };
  return (
    <Flex
      py={{ base: '14px', lg: '20px' }}
      px={{ base: '20px', lg: '24px' }}
      mb={{ base: '16px', lg: '24px' }}
      bg={useColorModeValue('white', 'todoBlue.600')}
      alignItems="center"
      borderRadius="md"
      onClick={() => focusHandler()}
    >
      <Box>
        {' '}
        <EditIcon h="24px" w="24px" color="todoBlue.200" mr={{ base: '12px', lg: '24px' }} />
      </Box>
      <form onSubmit={(e) => submitHandler(e)} style={{ width: '100%' }}>
        <Input
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          type="text"
          color={color}
          variant="unstyled"
          fontSize={{ base: '12px', lg: '18px' }}
          w="full"
          placeholder={!disableInput ? 'Create a todo profile' : 'Create a new todo....'}
          style={{ caretColor: caretColor }}
          ref={inputBox}
          disabled={!disableInput}
        />
      </form>
    </Flex>
  );
};

export default TodoInput;
