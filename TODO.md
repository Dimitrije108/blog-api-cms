TODO:

 - rework validation errors on backend to be objects with input field property values
so that an error can be displayed under each field separately
 - Implement React Router functionality - loaders, actions, pending, etc.
 - Add SEO friendly routes with slugs - use slugify. Use method with both id and slub /articles/3/statined-roman-legions-on-balkans
 - Add breadcrumbs
 - Add logged in succesful message - toast

PLAN:

0. Make a Login page and connect to server
	- ~~Make login page be the default~~
	- ~~Add logout funcitonality~~
	- ~~Implement it with the REST API backend~~
	- Add a link to user side of the site on the login page so that a user can go to it easily
	- Add a guest login so that people can check the CMS out for themselves without the need for an admin account
	- ~~Fix refresh token messing up sometimes~~

1. Make a Header with Archaeoblog site title
	- ~~Github link~~
	- ~~Logout link~~
	- Search bar with article search functionality

2. Make a CMS sidebar with:
	1. Dashboard page
		- needs new query from API for all the info!
		- ~~Hello Anakin! Welcome to Archaeoblog.~~
		- Create new article button
		- Number of articles
		- Below that number od published and unpublished articles both clickable
		- Number of categories and link to them
		- Number od users and link to them
		- Number of comments and link to them
	2. Articles page
		- Display all articles
		- Switch between published and unpublished articles
		- Articles can be viewed via article card button
		- Articles can be edited via article card button (same way it's created just filled out with info from db)
		- Article publish status can be changed via article card toggle switch
		- ~~Wrap every article card inside <article> tag~~
		- Add server side sorting
		- Which will require adding pagination as well
	3. Create Article page
		- ~~Opens the article creation form with title, tinyMCE text editor, category, and published checkbox with a publish article question~~
		- ~~Content is saved in local storage so page refresh or anything else doesn't cause data loss~~
		- ~~Make it a controlled component~~
		- ~~Submitting the article saves it in db. Reset the text editor and localStorage in that instance~~
		- Show a submitted confirmation message
		- Add tags to articles potentialy in the future
	4. Categories page
		1. ~~Create new category button with modal functionality~~
		2. ~~List all categories~~
		3. Update category name
		4. Delete category
		5. Clicking a category opens all articles for that category
	5. Users page
		1. List all users that are not admins
		2. Update user
		3. Create user
		4. Delete user
	6. Comments page
		1. List all comments
		2. Delete comment
		3. Flag a comment - optional feature maybe?
