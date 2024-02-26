var assert = require("chai").assert;
var {
  createBand,
  breakUpBand,
  fireThatOneGuyAndReuniteBand,
  announceTour,
} = require("./band");

describe("Band", function () {
  it("should create a band", function () {
    var band = createBand(
      "The Flying K-9's",
      ["Drums", "Guitar", "Bass", "Singer"],
      ["album 1", "album 2", "album 3"],
      "Rock",
      false
    );

    assert.equal(band.name, "The Flying K-9's");
    assert.equal(band.members.length, 4);
    assert.equal(band.albums.length, 3);
    assert.equal(band.albums[1], "album 2");
    assert.equal(band.genre, "Rock");
    assert.equal(band.isBrokenUp, false);
  });

  it("should return an error string if no members are provided", function () {
    var band1 = createBand(
      "The Flying K-9's",
      [],
      ["album 1", "album 2", "album 3"],
      "Rock",
      false
    );
    var band2 = createBand(
      "The Flying K-9's",
      null,
      ["album 1", "album 2", "album 3"],
      "Rock",
      false
    );

    assert.equal(
      band1,
      "Error: No band members were provided!  A band must have at least one member listed."
    );
    assert.equal(
      band2,
      "Error: No band members were provided!  A band must have at least one member listed."
    );
  });

  it("should be able to change band.isBrokenUp from false to true", function () {
    var band1 = createBand(
      "The Flying K-9's",
      ["Drums", "Guitar", "Bass", "Singer"],
      ["album 1", "album 2", "album 3"],
      "Rock",
      false
    );

    assert.equal(band1.isBrokenUp, false);

    var brokenUpBand = breakUpBand(band1);

    assert.equal(brokenUpBand.isBrokenUp, true);
  });

  it("should be able to change band.isBrokenUp from true to false by eliminating one member of the band", function () {
    var band1 = createBand(
      "The Flying K-9's",
      ["Drums", "Bass", "Singer", "Lead Guitar", "Rhythm Guitar", "Flute"],
      ["album 1", "album 2", "album 3"],
      "Rock",
      true
    );

    assert.equal(band1.isBrokenUp, true);
    assert.equal(band1.members.length, 6);

    var brokenUpBand = fireThatOneGuyAndReuniteBand(band1);

    assert.equal(brokenUpBand.isBrokenUp, false);
    assert.equal(band1.members.length, 5);
  });

  it("should announce their tour if band is together", function () {
    var band1 = createBand(
      "The Flying K-9's",
      ["Drums", "Guitar", "Bass", "Singer"],
      ["album 1", "album 2", "album 3"],
      "Rock",
      false
    );
    var band2 = createBand(
      "The Tired and The Sick",
      ["Drums", "Bass", "Singer", "Lead Guitar", "Rhythm Guitar", "Flute"],
      ["album 1", "album 2", "album 3", "album 4", "album 5"],
      "Metal",
      false
    );
    var band3 = createBand(
      "The Broken ups",
      ["Drums", "Bass", "Singer", "Lead Guitar"],
      ["album 1", "album 2"],
      "Country",
      true
    );

    var band1TourAnnouncement = announceTour(band1);
    var band2TourAnnouncement = announceTour(band2);
    var band3TourAnnouncement = announceTour(band3);

    assert.equal(
      band1TourAnnouncement,
      "We're The Flying K-9's and the 4 of us are going on a Rock tour to celebrate our 4th album!"
    );
    assert.equal(
      band2TourAnnouncement,
      "We're The Tired and The Sick and the 6 of us are going on a Metal tour to celebrate our 6th album!"
    );
    assert.equal(
      band3TourAnnouncement,
      "Error: The Broken ups can not tour when because they are not talking to each other."
    );
  });
});
