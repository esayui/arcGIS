arcGIS
======

Integrating arcGIS maps into an eclipse RCP application
ArcGIS is a product developed by ESRI for managing and designing solutions through the application of geographical knowledge.

A browser is created in eclipse rcp and this calls the arcGIS webapplication.
In the arcGIS webapplication a map with a specific map id is created using information from arcGIS.com.

####################################################################################################################
Installation:

Copy the arcGIS folder into the root of your web server. (For Firefox on Ubuntu it is at var/www/)

Open eclipse with the arcGIS_eclipse folder as the workspace.

In eclipse go to Window > Preferences > Plug -in developement > Target Platform
Then add all of the folders in the folder 'Target' to the target platform. Use the current platform option.

Now go to Run > Run Configurations
Select one of the Eclipse Applicaitons in the righthandside tab. (It has to be arcGIS.product)
Then select the Plug-ins tab.
Click Deselect All
Select arcGIS in the workspace.
Click Add Required Plug-ins.
Click apply.

From eclipse run the programme.

###################################################################################################################
Run-time:
To demonstrate the abbilities of my program, I have created a hundred random nodes.
Each node has its own random information, which is used to determine the range of each node.
This information can easily be changed to more specific data.
To indicate the nodes, I used a simple red pin icon, which changes to a pink square when the node is selected.
A node can either have a circular or conical range.
When you click on a node it shows the random information of the node and also its range.

Functions:
Select - Enables the selection of more than one node and displays the selected ranges.
Clear Selection - Clears the selected nodes, but keeps the ranges visible.
Clear map - Clears all the ranges and selected nodes.
Select Range - Selects nodes if their ranges fall in the specified extent.
Draw - The same as Select Range, except the extent can be specified as a freehand polygon.
Refresh - Clears all the graphics and generates new data and nodes.

###################################################################################################################
Interesting information:
Langauges that can be used with arcGIS:
Javascript
Adobe Flex
Microsoft Silverlight
.NET
Java

(Online APIs are available)


