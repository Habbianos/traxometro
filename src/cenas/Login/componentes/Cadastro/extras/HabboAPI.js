class Entity {
    constructor(data) {
        if (data) {
            this.parse(data)
        }
    }

    parse(data) {
        this._data = data;
    }
}

class Habbo extends Entity {
    parse(data) {
        // this._data = data
        this._id = data.uniqueId;
        this._name = data.name;
        this._motto = data.motto;
        this._figureString = data.figureString || data.habboFigure;
        this._memberSince = data.memberSince;
        this._profileVisible = data.profileVisible;
        this._selectedBadges = data.selectedBadges ? data.selectedBadges.map(b => new Badge(b)) : data.selectedBadges;
    }
    
    
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get motto() {
        return this._motto;
    }
    get figureString() {
        return this._figureString;
    }
    get memberSince() {
        return this._memberSince;
    }
    get profileVisible() {
        return this._profileVisible;
    }    
    get selectedBadges() {
        return this._selectedBadges;
    }
}

class Profile extends Entity {
    parse(data) {
        this._data = data;
        this._habbo = new Habbo(data.user);
        this._friends = data.friends ? data.friends.map(f => new Habbo(f)) : data.friends;
        this._groups = data.groups ? data.groups.map(g => new Group(g)) : data.groups;
        this._rooms = data.rooms ? data.rooms.map(r => new Room(r)) : data.rooms;
        this._badges = data.badges ? data.badges.map(b => new Badge(b)) : data.badges;
    }

    get habbo() {
        return this._habbo;
    }
    get friends() {
        return this._friends;
    }
    get groups() {
        return this._groups;
    }
    get rooms() {
        return this._rooms;
    }
    get badges() {
        return this._badges;
    }
}

class Photo extends Entity {
    parse(data) {
        // this._data = data;
        this._id = data.id;
        this._preview_url = data.previewUrl;
        this._tags = data.tags;
        this._type = data.type;
        this._url = data.url;
        this._taken_on = data.time;
        this._creator_uniqueId = data.creator_uniqueId;
        this._creator_name = data.creator_name;
        this._creator_id = data.creator_id;
        this._room_id = data.room_id;
        this._likes = data.likes;
    }
    
    get id() {
        return this._id;
    }
    get preview_url() {
        return this._preview_url;
    }
    get tags() {
        return this._tags;
    }
    get type() {
        return this._type;
    }
    get url() {
        return this._url;
    }
    get taken_on() {
        return this._taken_on;
    }
    get creator_uniqueId() {
        return this._creator_uniqueId;
    }
    get creator_name() {
        return this._creator_name;
    }
    get creator_id() {
        return this._creator_id;
    }
    get room_id() {
        return this._room_id;
    }
    get likes() {
        return this._likes;
    }
}

class Group extends Entity {
    parse(data) {
        // this._data = data;
        this._id = data.id;
        this._name = data.name;
        this._description = data.description;
        this._type = data.type;
        this._primaryColour = data.primaryColour;
        this._secondaryColour = data.secondaryColour;
        this._badgeCode = data.badgeCode;
        this._roomId = data.roomId;
        this._isAdmin = data.isAdmin;
        // this._members;
    }

    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get type() {
        return this._type;
    }
    get primaryColour() {
        return this._primaryColour;
    }
    get secondaryColour() {
        return this._secondaryColour;
    }
    get badgeCode() {
        return this._badgeCode;
    }
    get roomId() {
        return this._roomId;
    }
    get isAdmin() {
        return this._isAdmin;
    }
    get members() {
        return this._members;
    }

    addMember(member) {
        this._members.push(member);
    }
}

class Achievement extends Entity {
    parse(data) {
        // this._data = data;
        this._id = data.achievement.id;
        this._name = data.achievement.name;
        this._category = data.achievement.category;
        this._requirements = data.requirements;
        this._level = data.level;
        this._score = data.score;
    }

    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get category() {
        return this._category;
    }
    get requirements() {
        return this._requirements;
    }
    get level() {
        return this._level;
    }
    get score() {
        return this._score;
    }
}

class Room extends Entity {
    parse(data) {
        // this._data = data;
        this._id = data.id;
        this._uniqueId = data.uniqueId;
        this._name = data.name;
        this._description = data.description;
        this._creationTime = data.creationTime;
        this._habboGroupId = data.habboGroupId;
        this._maximumVisitors = data.maximumVisitors;
        this._tags = data.tags;
        this._showOwnerName = data.showOwnerName;
        this._ownerName = data.ownerName;
        this._ownerUniqueId = data.ownerUniqueId;
        this._categories = data.categories;
        this._thumbnailUrl = data.thumbnailUrl;
        this._imageUrl = data.imageUrl;
        this._rating = data.rating;
    }

    get id() {
        return this._id;
    }
    get uniqueId() {
        return this._uniqueId;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get creationTime() {
        return this._creationTime;
    }
    get habboGroupId() {
        return this._habboGroupId;
    }
    get maximumVisitors() {
        return this._maximumVisitors;
    }
    get tags() {
        return this._tags;
    }
    get showOwnerName() {
        return this._showOwnerName;
    }
    get ownerName() {
        return this._ownerName;
    }
    get ownerUniqueId() {
        return this._ownerUniqueId;
    }
    get categories() {
        return this._categories;
    }
    get thumbnailUrl() {
        return this._thumbnailUrl;
    }
    get imageUrl() {
        return this._imageUrl;
    }
    get rating() {
        return this._rating;
    }
}

class Badge extends Entity {
    parse(data) {
        // this._data = data;
        this._badgeIndex = data.badgeIndex;
        this._code = data.code;
        this._name = data.name;
        this._description = data.description;
    }

    get badgeIndex() {
        return this._badgeIndex;
    }
    get code() {
        return this._code;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
}

export default class HabboAPI {
    constructor(hotel = 'com') {
        this.hotel = hotel;
        this.api_base = 'https://www.habbo.'+this.hotel;
    }

    async getHabbo(id, useUniqueId = false) {
        let url = useUniqueId ? '/api/public/users/'+id : '/api/public/users?name='+id;

        let habbo = new Habbo();

        await this._urlRquest(this.api_base + url)
            .then((r) => {
                habbo.parse(r);
            }).catch((err) => {
                throw new Error("Error getting habbo's info: ", +err);
            });

        return habbo;
    }

    async getProfile(id) {
        let url = '/api/public/users/'+id+'/profile';

        let profile = new Profile();

        await this._urlRquest(this.api_base + url)
            .then((r) => {
                profile.parse(r);
            }).catch((err) => {
                throw new Error("Error getting profile: ", +err);
            });

        return profile;
    }

    async getPhotos(id) {
        let url = id ? '/extradata/public/users/'+id+'/photos' : '/extradata/public/photos';

        let photos = [];

        await this._urlRquest(this.api_base + url)
            .then((r) => {
                r.map(p => photos.push(new Photo(p)));
            }).catch((err) => {
                throw new Error("Error getting photos: ", +err);
            });

        return photos;
    }

    async getGroup(id) {
        let url_group = '/api/public/groups/'+id,
            url_members = url_group+'/members';

        let group = new Group();

        await this._urlRquest(this.api_base + url_group)
            .then((r) => {
                group.parse(r);
            }).catch((err) => {
                throw new Error("Error getting group's info: " + err)
            });

        await this._urlRquest(this.api_base + url_members)
            .then((r) => {
                r.map(m => group.addMember(new Habbo(m)));
            }).catch((err) => {
                throw new Error("Error getting group's members: " + err)
            });

        return group;
    }

    async getAchievements(id) {
        let url = '/api/public/achievements/'+id;

        let achs = [];

        await this._urlRquest(this.api_base + url)
            .then((r) => {
                r.map(a => achs.push(new Achievement(a)))
            }).catch((err) => {
                throw new Error("Error getting achievements: ", +err);
            });

        return achs;
    }

    _urlRquest(url, asJson = true) {
        return new Promise((resolve, reject) => {
            let req;
            if (window.XDomainRequest) {
                req = new XDomainRequest();
                req.open('get', url);
    
                // Update the timeout to 30 seconds for XDomainRequests. 
                req.timeout = 30000;
            } else {
                req = new XMLHttpRequest();
                req.open('get', url);
                // req.setRequestHeader('User-Agent', 'swapi-javascript');
                // req.setRequestHeader('Accept', 'application/json');
            }
            req.onload = e => {
                if(req.readyState !== 4 && e.type !== 'load') return;
                if(req.status && req.status !== 200) {
                    reject(req.status);
                } else {
                    resolve(asJson ? JSON.parse(req.responseText) : req.responseText);
                }
            };
    
            // Wrap in a 0 millisecond timeout.
            // XDomainRequests appear to randomly fail unless kicked into a new scope.
            setTimeout(function(){
                req.send();
            }, 0);
        })
    }
}