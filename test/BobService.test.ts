import * as should from "should"
import { BobService, Excerpt } from "../src/domain/BobService"

describe("BobService", () => {
  context("search", () => {
    // given
    const author1 = "author1"
    const book1 = "book1"
    const excerpts: Excerpt[] = [
      { author: author1, book: book1, content: "this is the first content", title: "This is a Title" },
      { author: author1, book: book1, content: "this is the 2nd content", title: "This is a Second Title" },
    ]

    // when
    const bobService = new BobService(excerpts)

    // then
    it("Finds in title", () => {
      const res = bobService.search("First")
      should(res).has.length(1)
      should(res[0]).eql(excerpts[0])
    })
    it("Finds in content", () => {
      const res = bobService.search("second")
      should(res).has.length(1)
      should(res[0]).eql(excerpts[1])
    })
  })
})