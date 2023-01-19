import { SortBy, SortDirection } from "../types";
import { sortBy } from ".";

describe("sortBy", () => {
  it("should sort by title", () => {
    const ideas = [
      { title: "B", created: new Date() },
      { title: "A", created: new Date() },
    ];
    const sortedIdeas = ideas.sort(sortBy(SortBy.TITLE, SortDirection.ASC));
    expect(sortedIdeas[0].title).toBe("A");
    expect(sortedIdeas[1].title).toBe("B");
  });
  it("should sort by created", () => {
    const ideas = [
      { title: "B", created: new Date("2020-01-02") },
      { title: "A", created: new Date("2020-01-01") },
    ];
    const sortedIdeas = ideas.sort(sortBy(SortBy.CREATED, SortDirection.ASC));
    expect(sortedIdeas[0].title).toBe("A");
    expect(sortedIdeas[1].title).toBe("B");
  });
  it("should sort by title descending", () => {
    const ideas = [
      { title: "A", created: new Date() },
      { title: "B", created: new Date() },
    ];
    const sortedIdeas = ideas.sort(sortBy(SortBy.TITLE, SortDirection.DESC));
    expect(sortedIdeas[0].title).toBe("B");
    expect(sortedIdeas[1].title).toBe("A");
  });
  it("should sort by created descending", () => {
    const ideas = [
      { title: "A", created: new Date("2020-01-01") },
      { title: "B", created: new Date("2020-01-02") },
    ];
    const sortedIdeas = ideas.sort(sortBy(SortBy.CREATED, SortDirection.DESC));
    expect(sortedIdeas[0].title).toBe("B");
    expect(sortedIdeas[1].title).toBe("A");
  });
});
