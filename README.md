# TASK LIST
## TO DO
- [x] determine which fields are saved (save groups?)
- [ ] adding/removing components

## TO BE TO-DO'D

+ visual design
+ create more basic components
<br></br>
<br></br>

# CHANGE LOG

## Wednesday 30.6.2021
First log entry. Added a base component which all other components must now extend.
The base component is to contain basic functions and properties that should be included in each DumpEm-component.
<br></br>
<br></br>

## Thursday 1.7.2021
Added variable as well as script support when fetching attributes via getModifiedState-method.
Also, added the interpret-static method which converts DumpEm-components' attribute strings to their actualized
forms (replaces variables with their values, fetches values returned by script calls).
<br></br>
<br></br>

## Friday 2.7.2021
Added FileExplorer that can be used to access the file system from displaying only specific files in a specific
folder to browsing and running files throughout the system. Even though the "changing repository"- task has been
marked as DONE, changing repository still isn't possible, though this is a matter of implementing the newly added
component reasonably to the initial workspace/repo.
<br></br>
<br></br>

## Saturday 3.7.2021
Added the saving of attributes to the configuration file of a component. Programmers can now assign "save groups"
which can will be used when saving upon an event. For example: <br></br>
```javascrtip
"savedFields": {
    "onUnmount": ["content", "fontSize"]
}
```
<br></br>
will save the "content" and "fontSize" attributes of a component once it's unmounted by React.
<br></br>
<br></br>
