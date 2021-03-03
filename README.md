# About

Full_Event_Cal is a simple Web Component that renders a full-page calendar
Upto 3 color coded events can be added for each day (more will be added in the future)
    * _red_
    * _blue_
    * _green_

# Installation

`npm install full_event_cal`

# Usage

> The package looks for the first container with the class name *full-calendar* and renders the calendar within it

### XHTML/View file

```
    <div class='full-calendar' ></div>
```

### Script

```
    fullCalendar()
```

> *Make sure that you have properly imported the package using a JS bundler like Webpack or Parcel*

# Options

## Events

```
    const eventsObject = {
        "2 march 2021": {
            red: "Play with doggos",
        },
        "03/05/2021": {
            green: "Say Hello to Mr. Spiderman",
            blue: "Assassinate 5 mosquitoes",
        },
    };

    fullCalendar(eventsObject);
```

## Styling

```
    const styles = {
        backgroundColor: '#eee',
        accent: '#eee'
    }
    fullCalendar(eventsObject, styles);
```