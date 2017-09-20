# Show Time

*Show Time* is a simple time planning tool for radio shows.

Use *Show Time* to build a schedule of show elements with their time durations. 
The start time of each item is calculated and displayed with the total show length. 
Show elements can be edited and their order changed using drag & drop.
Shows can be saved to a file as data and uploaded to other instances of Show Time. 
They can also be saved as text or spreadsheet CSV files.

To save the data without using a server, the browser's local storage feature is used. 
This means the information is stored in the web browser, as long as the browser configuration allows it. 
This makes *Show Time* available at no cost thanks to the free hosting from [GitHub](https://github.com). 
Please see the **Data Storage** section for details.

This is a [100 Days of Code](http://100daysofcode.com/) project.

## Status 

No more work is planned.

There are features I'm interested in adding and I'd like to fix the drag and drop issue, 
but that would be at some undetermined, future time.

## Known Issues

* Drag and drop sorting is not working in Firefox and IE11.

## Data Storage

ShowTime uses a web-browser feature named local storage to store your information. 
In many ways it makes your web-browser act like a desktop program.

**Please be aware of the following before using:**

* If you clear local storage in your web-browser you will delete your *Show Time* information
* Each web-browser has its own local storage. This means if you run *Show Time* in Chrome, you will not see your information in FireFox, Edge, or Safari.
* If you run *Show Time* in an anonymous browser session, no data is saved when the browser window is closed.
