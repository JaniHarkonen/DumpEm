# TASK LIST
## TO DO

# Repository tasks
- [ ] create a popup window for "Add"-option
- [ ] improve existing components

- [ ] determine what components should be created
- [ ] ? add a validity check for repositories in FileExplorer

## TO BE TO-DO'D
+ create more abstraction for components
+ visual design
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
```javascript
"savedFields": {
    "onUnmount": ["content", "fontSize"]
}
```
<br></br>
will save the "content" and "fontSize" attributes of a component once it's unmounted by React.
<br></br>
<br></br>

## Sunday 4.7.2021
It is now possible to add and remove sub-components. However, this functionality has to be substantially developed
later on.
<br></br>
<br></br>

## Monday 5.7.2021
Did some refactoring creating a folder for "general" components, which are the parent components each DumpEm-
component should inherit from, and "common" components, which should components frequently used across different
repositories.<br></br>
```javascript
ManifestComponent
```
was also created, which is designed to be the parent for all components that have a visual manifestation in the
workspace. From this point on, components without a visual manifestation should not have the "options" attribute,
as in order to bring up the options screen, the user has to click on a manifestation first.
<br></br>
<br></br>

## Wednesday 7.7.2021
Added the ability to modify components. Currently users can only drag components.
<br></br>
Added the ability to resize components.

## Sunday 11.7.2021
Began creating the initial repository selection window. A visual rework of some components, FileExplorer for
example, was required, as well as the addition of new features for existing components. New components were
also added, including geneal ones like TextItem and ImageItem, but also common ones like Button. The EXTERN-
folder will be used to store the assets and configurations for the repository selection window, however a
hook must be created that allows repositories to have their own versions of "Scripts.js" and "Assets.js" files.
In the worst case scenario, this is not possible and the files will have to be appended manually in the
DumpEm application folder.

## Tuesday 13.7.2021
Repository selection is now done. Only repository validity check and file sorting are needed, however, these
can be postponed for later. The startup repository containing the repository selection window should be
created. This requires some changes to the logic of loading external assets, namely scripts and effects
(graphics, sounds etc.). 