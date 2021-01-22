import React from 'react'
import { Formik, Field, Form, FieldArray, FieldInputProps } from 'formik'
import {
  Input,
  Textarea,
  Button,
  FormLabel,
  FormControl,
  HStack,
  VStack,
  Box,
} from '@chakra-ui/react'
import { Ingredient, Recipe } from './recipesInterfaces'

export const emptyIngredient: Ingredient = {
  item: '',
  quantity: 0,
  measurement: '',
}

export const emptyRecipe: Recipe = {
  name: '',
  ingredients: [emptyIngredient],
  prepTime: '',
  cookTime: '',
  preparation: '',
  directions: '',
}

type P = {
  submitRecipe: (values: Recipe) => void
  recipe?: Recipe
}

export const RecipeForm: React.FC<P> = ({
  submitRecipe,
  recipe = emptyRecipe,
}) => {
  return (
    <Formik<Recipe>
      initialValues={recipe}
      onSubmit={async (values) => {
        await submitRecipe(values)
      }}
    >
      {(props) => {
        return (
          <Form>
            <HStack spacing={4} align="stretch" justify="space-around">
              <Box flex={1}>
                <VStack align="stretch" spacing={4}>
                  <Field name="name">
                    {({ field }: { field: FieldInputProps<'name'> }) => (
                      <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input {...field} />
                      </FormControl>
                    )}
                  </Field>
                  <FieldArray
                    name="ingredients"
                    render={(arrayHelpers) => (
                      <>
                        {props.values.ingredients.map(
                          (ingredient: Ingredient, index: number) => (
                            <HStack
                              key={index}
                              spacing={4}
                              align="flex-end"
                              justify="space-around"
                            >
                              <FormControl>
                                <FormLabel>Number</FormLabel>
                                <Field
                                  name={`ingredients[${index}].quantity`}
                                  as={Input}
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel>Measurement</FormLabel>
                                <Field
                                  name={`ingredients[${index}].measurement`}
                                  as={Input}
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel>Ingredient</FormLabel>
                                <Field
                                  name={`ingredients[${index}].item`}
                                  as={Input}
                                />
                              </FormControl>
                              <Button
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                -
                              </Button>
                            </HStack>
                          ),
                        )}
                        <Button
                          onClick={() => arrayHelpers.push(emptyIngredient)}
                        >
                          Add another ingredient
                        </Button>
                      </>
                    )}
                  />
                </VStack>
              </Box>
              <Box flex={1}>
                <VStack align="stretch" spacing={4}>
                  <FormControl>
                    <FormLabel>Prep Time</FormLabel>
                    <Field name="prepTime" as={Input} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Cook Time</FormLabel>
                    <Field name="cookTime" as={Input} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Preparation Directions</FormLabel>
                    <Field name="preparation" as={Textarea} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Cooking Directions</FormLabel>
                    <Field name="directions" as={Textarea} />
                  </FormControl>
                  <Button type="submit">Submit!</Button>
                </VStack>
              </Box>
            </HStack>
          </Form>
        )
      }}
    </Formik>
  )
}
