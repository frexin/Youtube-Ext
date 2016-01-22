'use strict';

describe('PageItemsTest', function() {
    var pageItemsCollection;

    beforeEach(function() {
        pageItemsCollection = new PageItemsCollection('#results a.yt-uix-tile-link');
    });

    it('should calculate score correctly', function() {
        var title = "this is test title";
        var words = ["is", "title"];

        expect(pageItemsCollection.getTitleScore(words, title)).toEqual(2);

        words = ["other"];
        expect(pageItemsCollection.getTitleScore(words, title)).toEqual(0);
    });

    it('should filter items by keywords', function() {
        var testItems = [
            {"title" : "red bean"}, {"title" : "green apple"}, {"title" : "yellow banana"}
        ];

        var words = ["red", "green", "bean"];
        expect(pageItemsCollection.filterCollectionByKeywords(testItems, words).length).toEqual(2);

        words = ["dog"];
        expect(pageItemsCollection.filterCollectionByKeywords(testItems, words).length).toEqual(0);
    });

    it('should correctly compare two arrays', function() {
        var first = [{"title" : "red bean"}, {"title" : "green apple"}];
        var second = [{"title" : "red bean"}, {"title" : "green apple"}];

        expect(pageItemsCollection.isCollectionsEqual(first, second)).toEqual(true);

        var second = [{"title" : "red"}];
        expect(pageItemsCollection.isCollectionsEqual(first, second)).toEqual(false);

    });
});
