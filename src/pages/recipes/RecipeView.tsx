import React from 'react'
import { useHistory, useParams, useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom'
import { gql, useMutation, useQuery } from '@apollo/client'
import { ShowIfStringHasData } from '../../common/components/ShowIfStringHasData'
import { ShowIfArrayHasData } from '../../common/components/ShowIfArrayHasData'
import { Ingredient, RecipeQuery } from './recipesInterfaces'
import {
  IconButton,
  ButtonGroup,
  VStack,
  HStack,
  Heading,
  Text,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { ParagraphTextOrDefault } from '../../common/components/ParagraphTextOrDefault'
import { useGetUser } from '../../common/hooks/useGetUser'

const RECIPE = gql`
  query GetRecipe($id: Int!) {
    recipes_by_pk(id: $id) {
      cookTime
      directions
      id
      ingredients {
        item
        measurement
        quantity
        id
      }
      name
      prepTime
      preparation
      familyId
    }
  }
`

const DELETE_RECIPE = gql`
  mutation UpdateRecipe($id: Int!, $recipe: recipes_set_input!) {
    update_recipes_by_pk(pk_columns: { id: $id }, _set: $recipe) {
      id
    }
  }
`

export const RecipeView: React.FC = () => {
  // @ts-ignore
  const { id } = useParams()
  const { url } = useRouteMatch()
  const history = useHistory()
  const { familyId } = useGetUser()
  const { loading, error, data } = useQuery<RecipeQuery>(RECIPE, {
    variables: { id },
  })
  const [deleteRecipeMutation] = useMutation(DELETE_RECIPE)

  if (loading) {
    // TODO Handle loading / error cases
    return <div>LOADING!</div>
  }
  if (error) {
    // TODO Handle loading / error cases
    return <div>ERROR!</div>
  }

  const { recipes_by_pk: recipe } = data!

  if (recipe === null) {
    return <h1>Please select a recipe.</h1>
  }

  const basePath = url.substring(0, url.lastIndexOf(`/${id}`))

  const deleteRecipe = async () => {
    await deleteRecipeMutation({
      variables: { id, recipe: { disabled: true } },
      refetchQueries: ['AllRecipes'],
    })
    history.push(basePath)
  }

  const canEdit = recipe.familyId === familyId
  const canDelete = recipe.familyId === familyId
  return (
    <VStack spacing={3} align="stretch">
      <ButtonGroup variant="outline" colorScheme="teal" spacing="4">
        {canEdit && (
          <Link to={`${url}/edit`}>
            <IconButton aria-label="Edit recipe" icon={<EditIcon />} />
          </Link>
        )}

        {canDelete && (
          <IconButton
            aria-label="Delete recipe"
            onClick={deleteRecipe}
            icon={<DeleteIcon />}
          />
        )}
      </ButtonGroup>
      <ShowIfStringHasData string={recipe.id}>
        <HStack spacing={8} align="center">
          <Heading>{recipe.name}</Heading>
          <ShowIfStringHasData string={recipe.prepTime}>
            <Text
              fontSize="md"
              color="gray.500"
            >{`Prep Time - ${recipe.prepTime}`}</Text>
          </ShowIfStringHasData>
          <ShowIfStringHasData string={recipe.cookTime}>
            <Text
              fontSize="md"
              color="gray.500"
            >{`Cook Time - ${recipe.cookTime}`}</Text>
          </ShowIfStringHasData>
        </HStack>
        <ShowIfArrayHasData array={recipe.ingredients}>
          <Heading size="md">Ingredients</Heading>
          <UnorderedList>
            {recipe.ingredients.map((ingredient: Ingredient) => (
              <ListItem
                marginLeft="20px"
                key={ingredient.id}
              >{`${ingredient.quantity} ${ingredient.measurement} ${ingredient.item}`}</ListItem>
            ))}
          </UnorderedList>
        </ShowIfArrayHasData>
        <Heading size="md">Preparation</Heading>
        <ParagraphTextOrDefault
          text={recipe.preparation}
          defaultText="There are no preparation details."
        />
        <Heading size="md">Cooking Directions</Heading>
        <ParagraphTextOrDefault
          text={recipe.directions}
          defaultText="There are no cooking direction details."
        />
      </ShowIfStringHasData>
    </VStack>
  )
}
