# Show Time

*Show Time* is a simple time planning tool for radio shows.

Using *Show Time* build a schedule of show items with their durations.
The start time of each item is calculated and displayed with the total show length.
Show elements can be edited and their order changed using drag & drop.
The show can also be saved as a text file.

To save user data without a server, the browser's local storage feature is used.
This allows <em>Show Time</em> to be made available as a working application without
server infrastructure but does present some data safety concerns.
Please see the <strong><em>Data Storage</em></strong> section for details.

This is a [100 Days of Code](http://100daysofcode.com/) project.

## Status 

There are known issues in Firefox and IE11. There are no known issues in Chrome.

A number of new features are planned and will be added as time permits.

## Known Issues

* Drag and drop sorting is not working in Fire Fox

## Data Storage

ShowTime uses a web-browser feature named local storage to store your information. In many ways it makes your web-browser act like a desktop program.

**Please be aware of the following before using:**

* If you clear local storage in your web-browser you will delete your ShowTime information
* Each web-browser has its own local storage. This means if you run ShowTime in Chrome, you will not see your information in FireFox, Edge, or Safari.
* If you run ShowTime in an anonymous browser session, no data is saved when the browser window is closed.
