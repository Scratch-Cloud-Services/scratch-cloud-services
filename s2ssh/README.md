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
npm install https://raw.githubusercontent.com/Scratch-Cloud-Services/scratch-cloud-services/s2ssh/s2ssh/s2ssh.tar.gz
```
Stable build:
```sh
npm install https://raw.githubusercontent.com/Scratch-Cloud-Services/scratch-cloud-services/master/s2ssh/s2ssh.tar.gz
```
## Usage
**Important!** Make sure to read the [Security Concerns](#security-concerns) first.  
```sh
s2ssh project-id [username@]host
```
## Package
```sh
make
```
