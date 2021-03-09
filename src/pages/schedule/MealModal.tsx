import React, { FC } from 'react'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'
import { isNil, isEmpty, partition, startsWith } from 'ramda'
import { useMultipleSelection } from 'downshift'
import { useGetUser } from '../../common/hooks/useGetUser'
import { useMutation, useQuery } from '@apollo/client'
import { GetUsers, User } from '../admin/adminTypes'
import { GET_CURRENT_MEMBERS } from '../admin/ManageFamily'

type FormValues = {
  name: string
  users: Array<string>
  recipes: Array<number>
}

type P = {
  isOpen: boolean
  onClose: () => void
  initialValues?: FormValues
}

const emptyValues: FormValues = {
  name: '',
  users: [],
  recipes: [],
}

const validateName = (name: string) => {
  if (isNil(name) || isEmpty(name)) {
    return 'Name is required'
  } else return true
}

export const MealModal: FC<P> = ({
  isOpen,
  onClose,
  initialValues = emptyValues,
}) => {
  const {
    register,
    handleSubmit,
    formState,
    errors,
    control,
  } = useForm<FormValues>()
  const { familyId } = useGetUser()
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({ initialSelectedItems: initialValues.recipes })
  const { loading, error, data } = useQuery<GetUsers>(GET_CURRENT_MEMBERS, {
    variables: { familyId },
  })

  let currentUsers: Array<User> = []
  if (!loading && !error && !isNil(data)) {
    currentUsers = data.users
  }

  const onSubmit = (data: FormValues) => {
    console.log(data)
    onClose()
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={!isNil(errors.name)}>
              <FormLabel>Meal Name</FormLabel>
              <Input
                name="name"
                defaultValue={initialValues.name}
                ref={register({ validate: validateName })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <Flex width="100%" padding={3} flexDir="row">
              <Flex flex="1" justifyContent="flex-start">
                <Controller
                  name="users"
                  control={control}
                  defaultValue={initialValues.users}
                  render={(props) => (
                    <CheckboxGroup
                      defaultValue={props.value}
                      onChange={(values) => props.onChange(values)}
                    >
                      <VStack alignItems="flex-start">
                        {currentUsers.map((user) => (
                          <Checkbox value={user.id} key={user.id}>
                            {user.name}
                          </Checkbox>
                        ))}
                      </VStack>
                    </CheckboxGroup>
                  )} // props contains: onChange, onBlur and value
                />
              </Flex>
              <Flex flex="1" justifyContent="flex-start">
                <CheckboxGroup
                  colorScheme="green"
                  defaultValue={['naruto', 'kakashi']}
                >
                  <VStack>
                    <Checkbox value="naruto">Naruto</Checkbox>
                    <Checkbox value="sasuke">Sasuke</Checkbox>
                    <Checkbox value="kakashi">kakashi</Checkbox>
                  </VStack>
                </CheckboxGroup>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button isLoading={formState.isSubmitting} type="submit">
              Add Meal
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
