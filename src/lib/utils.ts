import { BASE_62_CHARACTERS, SHORTENED_URL_LENGTH } from "../constants/url"

export function generateRandomSlug(): string {
  let generatedSlug = ""

  for (let i = 1; i <= SHORTENED_URL_LENGTH; i++) {
    generatedSlug += BASE_62_CHARACTERS[Math.floor(Math.random() * BASE_62_CHARACTERS.length)]
  }

  return generatedSlug
}
