### Release 2.3.2 - February 2018

This is a minor release that prepares client to update to release 2.4.0.
Changes:

* Log out user when session expires
* Fix some authentication and authorization issues

### Release 2.3.1 - January 2018

This release fixes some issues:

* Unable to change team briefly after logging in
* What's New modal window should be shown once per version



### Release 2.3.0 - December 2017

The main goal of this release was to provide Admins feature and to separate 
Teams (now Clubs) from Profile.
  
#### Changelog
* Teams feature was moved from Profile to top navbar
* **Teams** were renamed to **Clubs** 
* Introduced **Club Admins** and highlighted them on user list
* Club admin may (de)activate other members (_deactivated users are hidden_)
* Club admin may grant admin privileges to others
* Page is scrolled to notifications when a new one appears
* Matches with score **0-0** are treated as a mistake and rejected
* Fixed some match deletion issues on mobile
* Fixed issues with saving settings
* Refactored users (performance boost)
