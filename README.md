# ALPHA RELEASE (current: V0.1.5)
**Tuesday 3.8.2021** - DumpEm as well as the workspace-based engine that's running it is now ready,
concluding the development for the alpha version (V0.1.0).
<br></br>
<br></br>

## Developer's comments
DumpEm's engine is still missing some features that are required for a better user experience, for example
the ability to modify existing components. Right now, the only way to edit components, aside from moving
and resizing, is to modify their configuration files which can be tedious in a repository with vast number
of nested components. However, the minimum number of features required for me to create the DumpEm
investment analysis program has been reached, and thus further development will become less frequent.
<br></br>
There are many inefficiencies and a great deal of messiness present in the code due to React, which seems
to be less fitted for a program that is as complex in nature as the DumpEm engine; complexity that mainly
arises from the nesting of components and the need to transfer information non-linearly across them. It is
for this reason, that I'm considering to re-write the whole engine from scratch using JavaScript only. This
will require me to, essentially, create my own framework for handling component rendering which, though 
potentially a large undertaking, would give the engine some performance improvements as well as make the 
development easier not having to worry about components' states.
<br></br>
Whether a re-write is necessary remains to be seen. However, there are still structural features that need
to be implemented, such as, having the engine require scripts from a "Scripts.js" file in the repository
through the "Scripts.js" file in the "EXTERN"- directory. Not only would this allow programmers to separate
their custom scripts from the ones provided by the engine, but it'd also be mandatory when dealing with
multiple repositories that implement different sets of scripts. Right now, programmers will have to append
their scripts to the "Scripts.js" file in "EXTERN", creating a massive mess and, eventually, naming
conflicts.
<br></br>

## DumpEm features
- ability to choose a repository or to access the most recent one
- ability to add components to a workspace
- ability to remove components from a workspace (incomplete)
- ability to move and resize components
- custom scripts
- component variables
- external assets

- following components are supported:
    - Workspace (ws)
    - Tabbed viewer (tv)
    - File explorer (fe)
    - Symbol list (sl)
    - Note (n)
    - Button (btn)
    - Image (img)
    - Text (t)

# TASK LIST
Alpha V0.1.5 has been released!

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
<br></br>
<br></br>

## Sunday 11.7.2021
Began creating the initial repository selection window. A visual rework of some components, FileExplorer for
example, was required, as well as the addition of new features for existing components. New components were
also added, including geneal ones like TextItem and ImageItem, but also common ones like Button. The EXTERN-
folder will be used to store the assets and configurations for the repository selection window, however a
hook must be created that allows repositories to have their own versions of "Scripts.js" and "Assets.js" files.
In the worst case scenario, this is not possible and the files will have to be appended manually in the
DumpEm application folder.
<br></br>
<br></br>

## Tuesday 13.7.2021
Repository selection is now done. Only repository validity check and file sorting are needed, however, these
can be postponed for later. The startup repository containing the repository selection window should be
created. This requires some changes to the logic of loading external assets, namely scripts and effects
(graphics, sounds etc.).
<br></br>
<br></br>

## Wednesday 14.7.2021
Made changes to the graphics of "Add", "Edit" and "Delete"- option buttons. They now incorporate SVG-graphics.
<br></br>
Created a popup window for adding a component to a workspace. Some generalization is still needed within the
component itself as well as in terms of creating a basic popup component which all other popups will extend.
Currently, the popup window cannot be used to add components to the workspace in any meaningful way.
<br></br>
<br></br>

## Monday 19.7.2021
Finally finished the "Add component"- popup. Users can now add components to a workspace with no modification
of .json- files required. Full functionality was achieved, however, further testing, as well as potentially
optimization, is required.
<br></br>
Added the ability to add tabs, which are just Workspaces that are fitted to the view, to a TabbedViewer.
The functionality is still incomplete, however.
<br></br>
<br></br>

## Tuesday 20.7.2021
Finished the functionality to add tabs to a TabbedViewer, as well as the functionality to delete workspaces
from their host components. There is still a lot to improve here, but the goal has now been shifted to
creating the first viable product that will function with acceptable stability and, at a bare minimum, the
components and functionalities required to create the "Investing" -repository.
<br></br>
<br></br>

## Saturday 24.7.2021
Very basic "Edit"- mode has been added to workspaces allowing components within to be moved around. The
positions will NOT, however, be saved in the configuration file making the mode mostly useless as of now.
The development will now be focused on the symbol list as this is the final component that will need major
changes for the first viable prodcut. After this, "Edit"- modes for other components have to be
added/refined before the minimum viable product can be released.
<br></br>
<br></br>

## Sunday 25.7.2021
Component's position and dimensions are now stored in the configuration file after being changed through
edit mode. SymbolList has now been mostly re-written with symbols that can display 4 data points in one
element. Symbols also have color codes that can be changed, however codes are not yet stored in the
configuration.
<br></br>
Added edit mode to TextItem, ImageItem and Note.

## Friday 30.7.2021
Added "Edit"- mode for remaining components. Workspace options have now been grafically reworked. The
focus is going to be on creating the minimum viable product that is capable of creating a stock analysis
repository with relative ease.
<br></br>
<br></br>

## Saturday 31.7.2021
Created a "Grid"-view for the FileExplorer. SymbolList's element's datapoints now have additional
properties that allow a user to decide which of the points are displayed and which are left hidden, ready
to be used by user-defined scripts.
<br></br>
Repositories have now been re-structured to utilize folders. This will make it easier to remove components
as they no longer need to be traversed to find and remove their subcomponents. THE MINIMUM VIABLE PRODUCT
IS NOW COMPLETE!
<br></br>
<br></br>

## Monday 2.8.2021
Creating the actual DumpEm market analysis program is now coming to a close. The elements of the SymbolList
still need a button for opening their TradingView link to conclude the list of features that will be added
to this version - alpha. So far, a number of tweaks and small additions have been made to the existing
components to allow DumpEm to be built. These changes are likely to be the final ones for the immediate
future, however many features still remain to be added.
<br></br>
<br></br>
