# s2ssh
A simple OpenSSH client wrapper that connects with Scratch via cloud variables.
## Security concerns
**Important!**  
Both stable and development builds may have security holes, although development builds are more likely.  
Please be sure you understand the risks before running.  
If you find a security hole, please report it on the [issue tracker](https://github.com/Scratch-Cloud-Services/scratch-cloud-services/issues).  
By running this script you are making your target machine vulnerable.  
Please be certain the whitelists and blacklists are properly configured.  
### Possible attacks
* Brute-forcing the password of `root` or other users  
Defence: Do not whitelist `su` or `sudo`

## Installation
**Warning! Pre-releases may have security holes!**  
Development build:
```sh
sudo npm install -g https://raw.githubusercontent.com/Scratch-Cloud-Services/scratch-cloud-services/s2ssh/s2ssh/s2ssh.tar.gz
```
or: (*nix only)
```sh
mkdir s2ssh && wget https://raw.githubusercontent.com/Scratch-Cloud-Services/scratch-cloud-services/s2ssh/s2ssh/s2ssh.tar.gz -O - | tar -xz -C s2ssh && sudo npm install -g s2ssh && rm -rf s2ssh
```
Stable build:
```sh
sudo npm install -g https://raw.githubusercontent.com/Scratch-Cloud-Services/scratch-cloud-services/master/s2ssh/s2ssh.tar.gz
```
or: (*nix only)
```sh
mkdir s2ssh && wget https://raw.githubusercontent.com/Scratch-Cloud-Services/scratch-cloud-services/master/s2ssh/s2ssh.tar.gz -O - | tar -xz -C s2ssh && sudo npm install -g s2ssh && rm -rf s2ssh
```
On Windows remove the `sudo` part.
## Usage
**Important!** Make sure to read the [Security Concerns](#security-concerns) first.  
### Syntax
```sh
s2ssh project-id [username@]host
```
### Tutorial
First you need to copy the [Scratch client project][1].  
Then obtain the project ID by looking at the URL.  
If the URL to the project is `https://scratch.mit.edu/projects/123456/`, then `123456` is the project ID.
Then decide on a remote host.  
It would be wise to set up a Virtual Machine running a Linux distro.  
You may like to avoid putting your name anywhere on the virtual machine.  
Set up a user with very little permissions.  
If your project ID is `123456`, and your username and host is `orcs@mordor`, your command will be:
```sh
s2ssh 123456 orcs@mordor
```
The first time you run it you will be prompted for Scratch username and password.  
Note that these will be saved in a file called `.scratchSession`.  
You may prefer to use an alternative account if you want to look at the project.  
To look at the project you will need a *Scratcher* account. It does not matter whether the account on the server is Scratcher or New Scratcher.  
You may then be prompted for remote host password or your key's password.  
Enter them.  
If you get an error, most likely the same account is looking at the project.
## Package
```sh
make
```
## Client project
The client project for the Scratch side is freely available [here][1] under a [CC BY-SA 2.0][2] license.
## Credits
> Thanks to @trumank for making [scratch-api][3]  
> Thanks to the Node.js Foundation for making [Node.js][4]
> Thanks to Google for making [V8][5], the JavaScript engine behind Node.js  
> Thanks to @BookOwl for creating the [Scratch Cloud Services][6] project  
> And thanks to all contributors who helped  
> s2ssh is available under a [MIT License][7]  

[1]: http://scratch.mit.edu/projects/86107164/
[2]: http://creativecommons.org/licenses/by-sa/2.0/deed.en
[3]: http://github.com/trumank/scratch-api
[4]: http://nodejs.org/
[5]: https://developers.google.com/v8/
[6]: https://github.com/Scratch-Cloud-Services
[7]: https://raw.githubusercontent.com/Scratch-Cloud-Services/scratch-cloud-services/master/LICENSE
