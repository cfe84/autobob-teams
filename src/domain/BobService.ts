export const excerpts_: Excerpt[] = [
  { title: "Don't be cute", book: "Clean Code", author: "Bob", content: "If names are too clever, they will be memorable only to people who share the author’s sense of humor, and only as long as these people remember the joke. Will they know what the function named HolyHandGrenade is supposed to do? Sure, it’s cute, but maybe in this case DeleteItems might be a better name. Choose clarity over entertainment value. Cuteness in code often appears in the form of colloquialisms or slang. For example, don’t use the name whack() to mean kill(). Don’t tell little culture-dependent jokes like eatMyShorts() to mean abort(). Say what you mean. Mean what you say." }
]

export interface Excerpt {
  title: string
  book: string
  author: string
  content: string
}

export class BobService {
  constructor(private excerpts: Excerpt[] = excerpts_) { }
  search(word: string): Excerpt[] {
    word = word.toLowerCase()
    const finds = this.excerpts
      .filter(excerpt =>
        excerpt.title.toLowerCase().indexOf(word) >= 0
        || excerpt.content.toLowerCase().indexOf(word) >= 0)
    return finds
  }
}