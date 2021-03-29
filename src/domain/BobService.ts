export const excerpts_: Excerpt[] = [
  { title: "Don't be cute", book: "Clean Code", author: "Bob", content: "If names are too clever, they will be memorable only to people who share the author’s sense of humor, and only as long as these people remember the joke. Will they know what the function named HolyHandGrenade is supposed to do? Sure, it’s cute, but maybe in this case DeleteItems might be a better name. Choose clarity over entertainment value. Cuteness in code often appears in the form of colloquialisms or slang. For example, don’t use the name whack() to mean kill(). Don’t tell little culture-dependent jokes like eatMyShorts() to mean abort(). Say what you mean. Mean what you say." },
  { title: "One word per concept", book: "Clean Code", author: "Bob", content: "Pick one word for one abstract concept and stick with it. For instance, it’s confusing to have fetch, retrieve, and get as equivalent methods of different classes. How do you remember which method name goes with which class? Sadly, you often have to remember which company, group, or individual wrote the library or class in order to remember which term was used. Otherwise, you spend an awful lot of time browsing through headers and previous code samples. Modern editing environments like Eclipse and IntelliJ-provide context-sensitive clues, such as the list of methods you can call on a given object. But note that the list doesn’t usually give you the comments you wrote around your function names and parameter lists. You are lucky if it gives the parameter names from function declarations. The function names have to stand alone, and they have to be consistent in order for you to pick the correct method without any additional exploration. Likewise, it’s confusing to have a controller and a manager and a driver in the same code base. What is the essential difference between a DeviceManager and a Protocol-Controller? Why are both not controllers or both not managers? Are they both Drivers really? The name leads you to expect two objects that have very different type as well as having different classes. A consistent lexicon is a great boon to the programmers who must use your code." },
  { title: "Boy scout rule", book: "Clean Code", author: "Bob", content: "It’s not enough to write the code well. The code has to be kept clean over time. We’ve all seen code rot and degrade as time passes. So we must take an active role in preventing this degradation. The Boy Scouts of America have a simple rule that we can apply to our profession. Leave the campground cleaner than you found it.5 5. This was adapted from Robert Stephenson Smyth Baden-Powell’s farewell message to the Scouts: “Try and leave this world a little better than you found it…” If we all checked-in our code a little cleaner than when we checked it out, the code simply could not rot. The cleanup doesn’t have to be something big. Change one variable name for the better, break up one function that’s a little too large, eliminate one small bit of duplication, clean up one composite if statement. Can you imagine working on a project where the code simply got better as time passed? Do you believe that any other option is professional? Indeed, isn’t continuous improvement an intrinsic part of professionalism?" },
  { title: "Do one thing", book: "Clean Code", author: "Bob", content: "The following advice has appeared in one form or another for 30 years or more. FUNCTIONS SHOULD DO ONE THING. THEY SHOULD DO IT WELL. THEY SHOULD DO IT ONLY." },
  { title: "Function arguments", book: "Clean Code", author: "Bob", content: "The ideal number of arguments for a function is zero (niladic). Next comes one (monadic), followed closely by two (dyadic). Three arguments (triadic) should be avoided where possible. More than three (polyadic) requires very special justification—and then shouldn’t be used anyway. Arguments are hard. They take a lot of conceptual power. That’s why I got rid of almost all of them from the example." },
  { title: "Comments don't make up for bad code", book: "Clean Code", author: "Bob", content: "One of the more common motivations for writing comments is bad code. We write a module and we know it is confusing and disorganized. We know it’s a mess. So we say to ourselves, “Ooh, I’d better comment that!” No! You’d better clean it! Clear and expressive code with few comments is far superior to cluttered and complex code with lots of comments. Rather than spend your time writing the comments that explain the mess you’ve made, spend it cleaning that mess." },
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