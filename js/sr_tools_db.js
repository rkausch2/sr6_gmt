var db = {
	// Generate a random race
	gen_race: function()
	{
		var r = roll.dval(100), res;

		switch (true)
		{
			case (r < 40):
				res = 'Human';
				break;

			case (r < 65):
				res = 'Ork';
				break;

			case (r < 80):
				res = 'Elf';
				break;

			case (r < 95):
				res = 'Dwarf';
				break;

			default:
				res = 'Troll';
		}

		return res;
	},

	get_base_attributes: function(rating)
	{
		var res = {};

		switch (rating)
		{
			case 0:
				res.attributes = {body: 3, agility: 3, reaction: 2, strength: 2, will: 3, logic: 2, intuition: 3, charisma: 2};
				break;

			case 1:
				res.attributes = {body: 3, agility: 3, reaction: 3, strength: 2, will: 3, logic: 3, intuition: 3, charisma: 2};
				break;

			case 2:
				res.attributes = {body: 3, agility: 3, reaction: 3, strength: 3, will: 3, logic: 3, intuition: 4, charisma: 2};
				break;

			case 3:
				res.attributes = {body: 4, agility: 3, reaction: 3, strength: 3, will: 3, logic: 3, intuition: 4, charisma: 3};
				break;

			case 4:
				res.attributes = {body: 4, agility: 4, reaction: 3, strength: 3, will: 4, logic: 3, intuition: 4, charisma: 3};
				break;

			case 5:
				res.attributes = {body: 4, agility: 4, reaction: 4, strength: 4, will: 4, logic: 3, intuition: 5, charisma: 3};
				break;

			case 6:
				res.attributes = {body: 5, agility: 4, reaction: 5, strength: 4, will: 5, logic: 3, intuition: 5, charisma: 3};
				break;

			default:
				console.log('ERROR: get_base_attributes() with no professional rating');
				break;
		}

		return res;
	},

	get_type_adjustments: function(type, rating)
	{
		var res = {
			attributes: {body: 0, agility: 0, reaction: 0, strength: 0, will: 0, logic: 0, intuition: 0, charisma: 0},
			skills: {},
			knowledge_skills: {},
			qualities: {
				positive: [],
				negative: []
			},
			weapons: [],
			armor: '',
			augmentations: [],
			gear: [],
			commlink: 1
		};

		switch (type)
		{
			case 'civilian':
				res.skills.Perception = 2 + rating;

				if (roll.dval(6) === 6)
				{
					res.skills.Firearms = 1 + rating;
					res.armor = 'Armor Clothing';
					res.weapons.push('Defiance EX Shocker');
				}
				break;

			case 'thug':
				res.attributes.reaction = 1;
				res.attributes.strength = 1;
				res.skills.Influence = 2 + rating;
				res.skills['Close Combat'] = 2 + rating;
				res.weapons.push('Club');
				res.weapons.push('Knife');

				if (rating > 4 || roll.dval(3) === 3)
				{
					res.skills.Firearms = 1 + rating;
					res.armor = 'Armor Vest';

					if (rating > 3)
						res.weapons.push('Browning Ultra-Power');
					else
						res.weapons.push('Colt America L36');
				}
				break;

			case 'ganger':
				res.attributes.body = 1;
				res.attributes.agility = 1;
				res.attributes.strength = 2;
				res.attributes.logic = -1;
				res.attributes.charisma = 1;
				res.skills.Influence = 2 + rating;
				res.skills.Firearms = 3 + rating;
				res.skills['Close Combat'] = 2 + rating;
				res.qualities.positive.push('Toughness');
				res.armor = 'Armor Vest';
				res.weapons.push('Knife');

				switch (roll.dval(4))
				{
					case 1:
						res.weapons.push('Defiance EX Shocker');
						break;

					case 2:
						res.weapons.push('Colt America L36');
						break;

					case 3:
						res.weapons.push('Browning Ultra-Power');
						break;

					case 4:
						res.weapons.push('Ares Predator VI');
						break;
				}


				if (rating > 1 && roll.dval(4) === 4)
				{
					res.skills.Athletics = 1 + rating;
					res.gear.push({
						name: 'Gas Grenade (CS/Tear)',
						quantity: 2
					});
				}
				else if (roll.dval(4) === 4)
				{
					res.weapons.push('Defiance T-250');
				}

				if (rating > 3)
				{
					res.armor = 'Armor Jacket';
				}
				break;

			case 'corpsec':
				res.attributes.body = 1;
				res.attributes.agility = 1;
				res.attributes.reaction = 1;
				res.attributes.logic = -1;
				res.attributes.intuition = -1;
				res.attributes.charisma = 1;
				res.skills.Influence = (rating * 2);
				res.skills.Perception = rating;
				res.skills.Firearms = 2 + rating;
				res.skills.Athletics = 3 + Math.floor(rating / 2);
				res.skills['Close Combat'] = 1 + rating;
				res.commlink = 3;

				if (rating < 2)
				{
					res.weapons.push('Fichetti Security 600');
					res.weapons.push('Stun Baton');
					res.armor = 'Armor Vest';
				}
				else if (rating < 5)
				{
					res.weapons.push('Colt Cobra TZ-120');
					res.weapons.push('Fichetti Security 600');
					res.weapons.push('Stun Baton');
					res.armor = 'Armor Jacket';
				}
				else
				{
					res.skills.Athletics = 1 + rating;
					res.weapons.push('FN P93 Praetor');
					res.weapons.push('Ares Predator VI');
					res.weapons.push('Stun Baton');
					res.armor = 'Full Body Armor';
					res.gear.push({
						name: 'Gas Grenade (CS/Tear)',
						quantity: 2
					});
					res.commlink = 5;
				}
				break;

			case 'police':
				res.attributes.reaction = 1;
				res.attributes.logic = -1;
				res.attributes.intuition = -1;
				res.skills.Perception = rating;
				res.skills.Firearms = 3 + Math.floor(rating / 2);
				res.skills.Athletics = 1 + Math.floor(rating / 2);
				res.skills['Close Combat'] = 1 + rating;
				res.armor = 'Armor Jacket';
				res.weapons.push('Defiance EX Shocker');
				res.weapons.push('Stun Baton');
				res.gear.push({
					name: 'Sunglasses',
					rating: 2,
					augments: ['Image link', 'Smartlink', 'Low-light Vision']
				});
				res.gear.push({
					name: 'Jazz',
					quantity: 2
				});
				res.commlink = 3;

				if (rating < 2)
				{
					res.armor = 'Armor Vest';
				}
				else
				{
					res.weapons.push('Ares Predator VI');
				}
				break;

			case 'mob':
				res.attributes.agility = 1;
				res.attributes.reaction = 1;
				res.attributes.strength = 1;
				res.skills.Firearms = 1 + rating;
				res.skills.Influence = 2 + rating;
				res.skills.Perception = Math.floor(rating / 2);
				res.skills['Close Combat'] = 2 + rating;
				res.qualities.positive.push('Toughness');
				res.armor = 'Lined Coat';
				res.weapons.push('Knife');
				res.commlink = 3;

				if (rating > 4)
				{
					res.weapons.push('AK-97');
				}
				else if (roll.dval(3) !== 3)
				{
					if (roll.dval(2) === 2)
						res.weapons.push('Ceska Black Scorpion');
					else
						res.weapons.push('Steyr TMP');
				}
				else if (roll.dval(2) === 2)
				{
					res.weapons.push('Colt Cobra TZ-120');
				}
				else
				{
					res.weapons.push('Ares Predator VI');
				}

				if (roll.dval(3) === 3)
				{
					res.skills.Athletics = 1 + rating;
					res.gear.push({
						name: 'Flashbang',
						quantity: 2
					});
				}

				if (rating > 4)
				{
					res.weapons.push('AK-97');
				}
				break;

			case 'htr':
				res.attributes.body = 2;
				res.attributes.agility = 1;
				res.attributes.reaction = 1;
				res.attributes.logic = 1;
				res.skills['Close Combat'] = 2 + rating;
				res.skills.Athletics = 1 + rating;
				res.skills.Influence = 3 + Math.ceil(rating / 2);
				res.skills.Firearms = rating * 2 - 1;
				res.skills.Perception = 3 + Math.ceil(rating / 2);
				res.skills.Stealth = 1 + rating;
				res.weapons.push('Ares Predator VI');
				res.commlink = rating - 1;
				res.augmentations.push({
					name: 'Cybereyes',
					rating: 2,
					augments: ['Flare Compensation', 'Image link', 'Smartlink', 'Thermographic vision', 'Low-light Vision']
				});

				switch (rating)
				{
					case 0:
					case 1:
						res.armor = 'Armor Jacket';
						res.weapons.push('Mossberg CMDT');
						break;

					case 2:
					case 3:
						res.armor = 'Full Body Armor';
						res.weapons.push('FN P93 Praetor');
						res.gear.push({
							name: 'Flashbang',
							quantity: 2
						});
						break;

					default:
						res.armor = 'Full Body Armor w/ Helmet & Chemical Seal';
						res.weapons.push('Ares Alpha');
						res.gear.push({
							name: 'Gas Grenade (CS/Tear)',
							quantity: 2
						});
						res.gear.push({
							name: 'Fragmentation',
							quantity: 2
						});
						break;
				}

				if (rating > 2)
				{
					res.augmentations.push({
						name: 'Muscle Augmentation',
						rating: Math.ceil(rating / 3)
					});
					res.augmentations.push({
						name: 'Muscle Toner',
						rating: Math.ceil(rating / 3)
					});
					res.augmentations.push({
						name: 'Wired Reflexes',
						rating: Math.ceil(rating / 3)
					});
				}
				break;

			case 'specops':
				res.attributes.body = 1;
				res.attributes.agility = 2;
				res.attributes.strength = 1;
				res.attributes.logic = 1;
				res.attributes.intuition = 1;
				res.attributes.charisma = 1;
				res.skills['Close Combat'] = 2 + rating;
				res.skills.Athletics = 1 + rating;
				res.skills.Stealth = rating;
				res.skills.Firearms = rating + 3;
				res.skills.Perception = 1 + rating;
				res.gear.push({
					name: 'Grapple Gun'
				});
				res.gear.push({
					name: 'Smoke Grenade',
					quantity: 2
				});
				res.commlink = rating - 1;

				switch (rating)
				{
					case 0:
					case 1:
						res.armor = 'Armor Jacket';
						res.weapons.push('FN P93 Praetor');
						break;

					case 2:
					case 3:
						res.armor = 'Full Body Armor';
						res.weapons.push('HK-227');
						res.gear.push({
							name: 'Flashbang',
							quantity: 2
						});
						res.gear.push({
							name: 'Thermal Smoke Grenade',
							quantity: 2
						});
						break;

					default:
						res.armor = 'Full Body Armor w/ Helmet & Chemical Seal';
						res.weapons.push({
							name: 'HK-227',
							ammo: 'APDS'
						});
						res.gear.push({
							name: 'Gas Grenade (CS/Tear)',
							quantity: 2
						});
						res.gear.push({
							name: 'Fragmentation',
							quantity: 2
						});
						break;
				}

				if (rating > 0)
				{
					res.augmentations.push({
						name: 'Muscle Augmentation',
						rating: Math.ceil(rating / 2)
					});
					res.augmentations.push({
						name: 'Muscle Toner',
						rating: Math.ceil(rating / 2)
					});
					res.augmentations.push({
						name: 'Synaptic Booster',
						rating: Math.ceil(rating / 2)
					});
				}
				break;

			case 'cultist':
				res.attributes.body = -1;
				res.attributes.strength = -1;
				res.attributes.logic = 1;
				res.attributes.intuition = 1;
				res.attributes.will = 2;
				res.skills['Close Combat'] = 1 + rating;
				res.skills.Athletics = 1 + rating;
				res.skills.Perception = 1 + rating;
				res.skills.Influence = 2 + rating;
				res.weapons.push('Club');
				res.weapons.push('Knife');

				if (roll.dval(3) === 3)
				{
					res.skills.Firearms = 1 + rating;
					res.weapons.push('Defiance T-250');
				}
				else if (roll.dval(3) === 3)
				{
					res.skills.Firearms = 1 + rating;
					res.weapons.push('Steyr TMP');
				}

				if (rating > 1)
				{
					res.skills.Athletics = 1 + rating;

					if (roll.dval(2) === 2)
					{
						res.gear.push({
							name: 'Flashbang',
							quantity: 2
						});
					}
					else
					{
						res.gear.push({
							name: 'Fragmentation',
							quantity: 2
						});
					}
				}
				break;

			case 'cast':
				// Special case for when the special adjustments matter more than the type adjustments
				res.attributes.charisma = 1;
				res.skills.Influence = 2 + rating;
				break;
		}

		return res;
	},

	// Adjustments if a standard LT, or mage, or decker, etc
	get_special_adjustments: function(special_type, options)
	{
		var rating = options.professional_rating;

		var res = {
			professional_description: '',
			attributes: {body: 0, agility: 0, reaction: 0, strength: 0, will: 0, logic: 0, intuition: 0, charisma: 0},
			skills: {},
			knowledge_skills: {},
			qualities: {
				positive: [],
				negative: []
			},
			weapons: [],
			armor: '',
			augmentations: [],
			gear: [],
			special: {}
		};

		if (special_type === 'LT')
		{
			switch (options.professional_type)
			{
				case 'civilian':
					res.professional_description = 'Civilian';
					res.attributes.will = 1;
					res.skills.Influence = 3;
					break;

				case 'thug':
					res.professional_description = 'Thug';
					res.attributes.agility = 1;
					res.attributes.strength = 1;
					res.attributes.logic = 1;
					res.skills.Influence = 2;
					res.skills.Firearms = 3;
					res.skills['Close Combat'] = 1;
					res.weapons.push('Colt America L36');
					break;

				case 'ganger':
					res.professional_description = 'Gang Member';
					res.attributes.reaction = 1;
					res.attributes.will = 1;
					res.attributes.logic = 1;
					res.attributes.intuition = 1;
					res.attributes.charisma = 1;
					res.skills.Influence = 3 + rating;
					res.skills['Close Combat'] = 3 + rating;
					res.augmentations.push({name:'Cyber Spur'});
					res.armor = 'Armor Jacket';
					break;

				case 'corpsec':
					res.professional_description = 'Corporate Security';
					res.attributes.agility = 1;
					res.attributes.logic = 1;
					res.attributes.intuition = 1;
					res.skills['Close Combat'] = 1 + rating;
					res.skills.Perception = 2 + rating;
					res.skills.Influence = 1 + rating;
					res.skills.Stealth = rating;
					res.gear.push({
						name: 'Goggles',
						rating: 2,
						augments: ['Image link', 'Smartlink', 'Thermographic Vision']
					});
					res.gear.push({
						name: 'Smoke Grenade',
						quantity: 2
					});
					break;

				case 'police':
					res.professional_description = 'Law Enforcement';
					res.attributes.agility = 1;
					res.attributes.logic = 1;
					res.attributes.intuition = 1;
					res.attributes.charisma = 1;
					res.skills.Firearms = 1 + rating;
					res.skills['Close Combat'] = 3 + rating;
					res.skills.Perception = 2 + rating;
					res.skills.Stealth = rating;
					res.skills.Influence = 1 + rating;
					res.augmentations.push({
						name: 'Cybereyes',
						rating: 2,
						augments: ['Flare Compensation', 'Image link', 'Smartlink', 'Thermographic vision', 'Low-light Vision']
					});
					break;

				case 'mob':
					res.professional_description = 'Organized Crime';
					res.attributes.reaction = 1;
					res.attributes.will = 1;
					res.attributes.logic = 1;
					res.attributes.charisma = 1;
					res.skills.Influence = 3 + rating;
					res.skills['Close Combat'] = 3 + rating;
					res.armor = 'Armor Jacket';
					res.augmentations.push({name:'Cyber Spur'});
					res.gear.push({
						name: 'Jazz',
						quantity: 2
					});
					res.gear.push({
						name: 'Novacoke',
						quantity: 2
					});
					break;

				case 'htr':
					res.professional_description = 'High Threat Response';
					res.attributes.agility = 1;
					res.attributes.reaction = 1;
					res.attributes.strength = 1;
					res.attributes.will = 1;
					res.skills['Exotic Ranged Weapons'] = 3 + rating;
					res.skills.Demolitions = rating;
					break;

				case 'specops':
					res.professional_description = 'Special Operations';
					res.attributes.reaction = 1;
					res.attributes.strength = 1;
					res.attributes.logic = 1;
					res.attributes.will = 1;
					res.qualities.positive.push('Toughness');
					res.weapons.push('Mossberg CMDT');
					break;

				case 'cultist':
					res.professional_description = 'Cultist';
					res.attributes.body = 2;
					res.attributes.intuition = 1;
					res.attributes.charisma = 2;
					res.skills.Firearms = rating;
					res.weapons.push('Steyr TMP');
					break;
			}
		}

		if (special_type === 'Adept')
		{
			// What kind of adept?
			var improved_skill = 'Firearms', bonus_weapon;

			switch (options.professional_type)
			{
				default:
				case 'civilian':
				case 'police':
					bonus_weapon = 'Remington Roomsweeper';
					break;

				case 'cultist':
				case 'ganger':
					bonus_weapon = 'Mossberg CMDT';
					break;

				case 'corpsec':
					bonus_weapon = 'FN HAR';
					break;

				case 'mob':
					bonus_weapon = 'AK-97';
					break;

				case 'htr':
					bonus_weapon = 'FN P93 Praetor';
					break;

				case 'specops':
					bonus_weapon = 'Cavalier Arms Crockett EBR';
			}

			// Attributes
			res.attributes.reaction = 1;
			res.attributes.strength = 1;

			// Skills
			res.skills.Astral = rating + 2;
			res.skills['Close Combat'] = rating + 2;
			res.skills.Firearms = rating + 2;

			// Qualities
			res.qualities.positive.push('Adept');

			// Weapon
			res.weapons.push(bonus_weapon);

			var weapon_name;
			switch (roll.dval(8))
			{
				default:
				case 1:
				case 2:
					weapon_name = 'Katana';
					break;

				case 3:
					weapon_name = 'Sword';
					break;

				case 4:
				case 5:
					weapon_name = 'Knife';
					break;

				case 6:
					weapon_name = 'Staff';
					break;

				case 7:
				case 8:
					weapon_name = 'Telescoping Staff';
					break;
			}
			if (rating > 4)
			{
				var focus = this.get_weapon(weapon_name);
				focus.magic_focus = true;
				focus.weapon_focus = true;
				focus.force = rating - 4;

				res.weapons.push(focus);
			}
			else
			{
				res.weapons.push(weapon_name);
			}

			if (rating > 3)
			{
				res.gear.push({
					name: 'Qi Focus',
					magic_focus: true,
					force: (rating - 3) * 2, // 4:2, 5:4, 6:6, 7:8
					power: 'Improved Strength',
					type: 'Improve Attribute',
					attribute: 'strength',
					rating: rating - 3
				});
			}

			// Specials : Spells
			res.special.Magic = 2 + rating;

			if (res.special.Magic > 6)
			{
				res.special.Initiate = res.special.Magic - 6;
				res.special.Magic = 6;
			}

			res.special.powers = [];

			switch (rating)
			{
				default:
				case 0:
					res.special.powers.push(
						{
							name: 'Improved Reflexes',
							rating: 1
						},
						{
							name: 'Improved Ability',
							type: 'ability',
							rating: 1,
							ability: improved_skill
						}
					);
					break;

				case 1:
					res.special.powers.push(
						{
							name: 'Improved Reflexes',
							rating: 1
						},
						{
							name: 'Improved Ability',
							type: 'ability',
							rating: 1,
							ability: improved_skill
						},
						{
							name: 'Improved Physical Attribute',
							type: 'attribute',
							rating: 1,
							attribute: 'Agility'
						}
					);
					break;

				case 2:
					res.special.powers.push(
						{
							name: 'Improved Reflexes',
							rating: 1
						},
						{
							name: 'Improved Ability',
							rating: 1,
							ability: improved_skill
						},
						{
							name: 'Improved Physical Attribute',
							rating: 2,
							attribute: 'Agility'
						}
					);
					break;

				case 3:
					res.special.powers.push(
						{
							name: 'Improved Reflexes',
							rating: 2
						},
						{
							name: 'Improved Ability',
							rating: 1,
							ability: improved_skill
						},
						{
							name: 'Improved Physical Attribute',
							rating: 2,
							attribute: 'Agility'
						}
					);
					break;

				case 4:
					res.special.powers.push(
						{
							name: 'Improved Reflexes',
							rating: 2
						},
						{
							name: 'Improved Ability',
							rating: 3,
							ability: improved_skill
						},
						{
							name: 'Improved Physical Attribute',
							rating: 2,
							attribute: 'Agility'
						}
					);
					break;

				case 5:
					res.special.powers.push(
						{
							name: 'Improved Reflexes',
							rating: 2
						},
						{
							name: 'Improved Ability',
							rating: 3,
							ability: improved_skill
						},
						{
							name: 'Improved Physical Attribute',
							rating: 3,
							attribute: 'Agility'
						}
					);
					break;

				case 6:
					res.special.powers.push(
						{
							name: 'Improved Reflexes',
							rating: 3
						},
						{
							name: 'Improved Ability',
							rating: 3,
							ability: improved_skill
						},
						{
							name: 'Improved Physical Attribute',
							rating: 3,
							attribute: 'Agility'
						}
					);
					break;
			}
		}

		if (special_type === 'Mage')
		{
			// Attributes
			res.attributes.will = 1;
			res.attributes.logic = 1;

			// Skills
			res.skills.Astral = rating + 2;
			res.skills.Conjuring = rating + 1;
			res.skills.Sorcery = rating + 2;

			// Qualities
			res.qualities.positive.push('Magician (Hermetic)');
			if (rating > 3)
			{
				res.qualities.positive.push('Focused Concentration ' + (rating - 2));
			}

			// Gear
			res.gear.push({
				name: 'Psyche',
				quantity: 2
			});
			res.gear.push({
				name: 'Reagents',
				quantity: 10
			});
			res.gear.push({
				name: 'Spellcasting focus (Combat)',
				magic_focus: true,
				rating: rating
			});

			if (rating > 3)
			{
				res.gear.push({
					name: 'Power focus',
					magic_focus: true,
					rating: rating - 3
				});
			}

			// Specials : Spells
			res.special.Magic = (rating < 2) ? 2 : rating;
			res.special.spells = ['Powerbolt', 'Silence', 'Stunball'];
			switch (rating)
			{
				case 6:
					res.special.spells.push('Armor', 'Agony');
				case 5:
					res.special.spells.push('Clairvoyance', 'Improved Invisibility');
				case 4:
					res.special.spells.push('Increase Reflexes', 'Combat Sense');
				case 3:
					res.special.spells.push('Heal');
				case 2:
					res.special.spells.push('Detect Life');
				case 1:
					res.special.spells.push('Physical Barrier');
				default:
					break;
			}
		}

		if (special_type === 'Decker')
		{
			// Attributes
			if (rating < 3)
			{
				res.attributes.body = -1;
				res.attributes.agility = -1;
				res.attributes.strength = -1;
				res.attributes.logic = 1;
				res.attributes.intuition = 1;
			}
			else if (rating < 5)
			{
				res.attributes.agility = -1;
				res.attributes.strength = -1;
				res.attributes.logic = 1;
				res.attributes.intuition = 1;
				res.attributes.will = 1;
			}
			else
			{
				res.attributes.logic = 2;
				res.attributes.intuition = 1;
				res.attributes.will = 1;
			}

			// Skills
			res.skills.Cracking = rating + 2;

			if (['corpsec', 'htr', 'mob', 'specops'].includes(options.professional_type))
			{
				res.skills.Influence = rating;
				res.skills.Cracking = rating + 1;
				res.skills.Electronics = rating + 1;
			}

			if (['htr', 'specops'].includes(options.professional_type))
			{
				res.skills.Demolitions = rating;
			}

			// Augmentations & Drugs
			if (rating > 5)
			{
				res.augmentations.push({
					name: 'Cerebellum Booster',
					rating: rating - 4
				});
			}

			if (rating >= 4)
			{
				res.augmentations.push({
					name: 'Cerebral Booster',
					rating: rating - 3
				});
				res.gear.push({
					name: 'Psyche',
					quantity: 2
				});
			}

			if (rating > 1)
			{
				res.augmentations.push({
					name: 'Datajack'
				});
			}
			else
			{
				res.gear.push({
					name: 'Trodes'
				});
			}

			// Deck
			switch (rating)
			{
				case 6:
				case 5:
					res.gear.push({
						name: 'Shiawase Cyber-5',
						type: 'cyberdeck',
						rating: 5,
						programs: ['Armor', 'Biofeedback', 'Decryption', 'Encryption', 'Fork', 'Hammer', 'Lockdown']
					});
					break;

				case 4:
				case 3:
					res.gear.push({
						name: 'Hermes Chariot',
						type: 'cyberdeck',
						rating: 2,
						programs: ['Armor', 'Decryption', 'Encryption', 'Fork', 'Hammer']
					});
					break;

				default:
					res.gear.push({
						name: 'Erika MCD-1',
						type: 'cyberdeck',
						rating: 1,
						programs: ['Armor', 'Baby Monitor', 'Fork']
					});
			}
		}

		if (special_type === 'Johnson')
		{
			// Attributes
			res.attributes.charisma = 1 + roll.half(rating);
			res.attributes.intuition = Math.max(roll.half(rating, true) - 1, 1);
			res.attributes.logic = Math.max(roll.half(rating, true) - 1, 1);
			res.attributes.will = Math.max(roll.half(rating - 1) - 1, 0);

			// Armor
			if (rating < 4)
				res.armor = 'Armor Clothing';
			else
				res.armor = 'Actioneer Business Clothes';

			// Skills
			res.skills.Electronics = rating + 1;
			res.skills.Con = rating + 1;
			res.skills.Influence = Math.max(2, rating * 2);
			res.skills.Perception = rating + 2;
		}

		if (special_type === 'Gunbunny')
		{
			// Attributes
			res.attributes.agility = 3;
			res.attributes.reaction = 1;
			res.attributes.intuition = 1;

			// Qualities
			res.qualities.positive.push('Ambidextrous');
			res.qualities.negative.push('Distinctive Style');

			// One random quality from positive and negative
			var pos_q = ['Analytical Mind', 'Blandness', 'First Impression', 'Lucky', 'Photographic Memory'];
			var neg_q = ['Gremlins I', 'Sensitive System', 'Uncouth', 'Uneducated'];
			var i = roll.dval(neg_q.length) - 1;
			res.qualities.negative.push(neg_q[i]);
			i = roll.dval(neg_q.length) - 1;
			res.qualities.positive.push(pos_q[i]);

			// Armor
			if (rating < 4)
				res.armor = 'Armor Vest';
			else
				res.armor = 'Armor Jacket';

			// Skills
			res.skills.Firearms = rating + 4;
			res.skills.Athletics = rating + 2;
			res.skills.Perception = rating + 2;
			res.skills.Stealth = rating + 2;

			// Weapons, Augmentations & Drugs
			res.gear.push(this.get_gear('Jazz'));

			if (rating > 0)
			{
				augment = this.get_augmentation('Muscle Toner');
				augment.rating = roll.half(rating) + 1;
				res.augmentations.push(augment);
				augment = this.get_augmentation('Synaptic Booster');
				augment.rating = roll.half(rating);
				res.augmentations.push(augment);
			}

			switch (options.race)
			{
				case 'Human':
					res.skills.Athletics = rating + 3;
					if (rating < 2)
					{
						res.weapons.push(this.get_weapon('Browning Ultra-Power'));
						res.weapons.push(this.get_weapon('Streetline Special'));
						res.gear.push(this.get_gear('Smoke Grenade'));
						res.gear.push(this.get_gear('Flashbang Grenade'));
					}
					else
					{
						res.weapons.push(this.get_weapon('Ares Predator VI'));
						res.weapons.push(this.get_weapon('Colt America L36'));
						res.gear.push(this.get_gear('Thermal Smoke Grenade'));
						res.gear.push(this.get_gear('Fragmentation Grenade'));
					}
					break;

				case 'Elf':
					if (rating < 2)
					{
						res.weapons.push(this.get_weapon('Ares Predator VI'));
						res.weapons.push(this.get_weapon('Fichetti Security 600'));
					}
					else
					{
						res.weapons.push(this.get_weapon('Ares Predator VI'));
						res.weapons.push(this.get_weapon('Ares Predator VI'));
					}
					break;

				case 'Dwarf':
					if (rating < 2)
					{
						res.weapons.push(this.get_weapon('Defiance T-250'));
						res.weapons.push(this.get_weapon('Browning Ultra-Power'));
					}
					else
					{
						res.weapons.push(this.get_weapon('Mossberg CMDT'));
						res.weapons.push(this.get_weapon('Ares Predator VI'));
					}

					break;

				case 'Ork':
					res.skills.Intimidation = rating + 3;
					res.weapons.push(this.get_weapon('Remington Roomsweeper'));
					res.weapons.push(this.get_weapon('Remington Roomsweeper'));
					break;

				case 'Troll':
					res.skills.Firearms = rating + 4;
					if (rating < 2)
					{
						res.weapons.push(this.get_weapon('Steyr TMP'));
						res.weapons.push(this.get_weapon('Steyr TMP'));
					}
					else
					{
						res.weapons.push(this.get_weapon('HK-227'));
						res.weapons.push(this.get_weapon('HK-227'));
					}
					break;
			}
		}

		if (special_type === 'Samurai')
		{
			// Attributes
			res.attributes.agility = 2;
			res.attributes.body = 1;
			res.attributes.reaction = 1;
			res.attributes.strength = 1;

			// Skills
			res.skills.Firearms = rating + 3;
			res.skills['Close Combat'] = rating + 2;
			res.skills.Perception = rating + 2;
			res.skills.Athletics = rating + 2;
			res.skills.Stealth = rating + 2;

			switch (options.race)
			{
				case 'Human':
					res.attributes.reaction = 2;
					res.skills['Close Combat'] = rating + 1;
					break;

				case 'Elf':
					res.attributes.reaction = 2;
					res.skills.Athletics = rating + 1;
					res.skills.Influence = rating + 1;
					break;

				case 'Dwarf':
					res.skills.Biotech = rating + 3;
					res.skills.Athletics = rating + 3;
					if (rating < 3)
					{
						res.gear.push(this.get_gear('Smoke Grenade'));
						res.gear.push(this.get_gear('Flashbang Grenade'));
					}
					else
					{
						res.gear.push(this.get_gear('Thermal Smoke Grenade'));
						res.gear.push(this.get_gear('Fragmentation Grenade'));
					}
					break;

				case 'Ork':
					res.skills.Influence = rating + 2;
					res.skills['Exotic Ranged Weapons'] = rating + 2;
					break;

				case 'Troll':
					res.skills.Influence = rating + 3;
					res.skills['Exotic Ranged Weapons'] = rating + 3;
					break;
			}

			// Qualities
			// One random quality from positive and negative
			var pos_q = ['Ambidextrous', 'Blandness', 'Gearhead', 'Magical Resistance I', 'Will to Live I'];
			var neg_q = ['Bad Luck', 'Dependent(s) I', 'Insomnia I', 'Scorched (BTLs)', 'Social Stress'];
			var i = roll.dval(neg_q.length) - 1;
			res.qualities.negative.push(neg_q[i]);
			i = roll.dval(neg_q.length) - 1;
			res.qualities.positive.push(pos_q[i]);

			// Armor
			if (rating < 5)
				res.armor = 'Armor Jacket';
			else
				res.armor = 'Full Body Armor';

			// Weapons, Augmentations & Drugs
			if (rating < 3)
				res.weapons.push(this.get_weapon('Knife'));

			var augment;

			if (rating < 2)
			{
				res.gear.push(this.get_gear('Goggles'));
			}
			else
			{
				augment = this.get_augmentation('Cybereyes');
				augment.rating = 2;
				res.augmentations.push(augment);
			}

			switch (options.race)
			{
				case 'Human':
					if (rating > 1)
					{
						augment = this.get_augmentation('Muscle Toner');
						augment.rating = roll.half(rating);
						res.augmentations.push(augment);
						augment = this.get_augmentation('Synaptic Booster');
						augment.rating = roll.half(rating - 1);
						res.augmentations.push(augment);
						res.augmentations.push(this.get_augmentation('Cyber Spur'));
					}
					if (rating > 0)
					{
						augment = this.get_augmentation('Cerebellum Booster');
						augment.rating = Math.ceil(rating / 3);
						res.augmentations.push(augment);
					}
					switch (rating)
					{
						case 0:
						case 1:
							res.weapons.push(this.get_weapon('Steyr TMP'));
							break;
						case 2:
						case 3:
							res.weapons.push(this.get_weapon('Colt Cobra TZ-120'));
							res.weapons.push(this.get_weapon('Colt America L36'));
							break;
						case 4:
						case 5:
						case 6:
							res.weapons.push(this.get_weapon('Ares Alpha'));
							res.weapons.push(this.get_weapon('Colt Cobra TZ-120'));
							res.weapons.push(this.get_weapon('Ares Predator VI'));
							break;
					}
					break;

				case 'Elf':
					if (rating > 1)
					{
						augment = this.get_augmentation('Muscle Toner');
						augment.rating = roll.half(rating);
						res.augmentations.push(augment);
						augment = this.get_augmentation('Synaptic Booster');
						augment.rating = roll.half(rating - 1);
						res.augmentations.push(augment);
						res.weapons.push(this.get_weapon('Katana'));
					}
					if (rating > 0)
					{
						augment = this.get_augmentation('Cerebellum Booster');
						augment.rating = Math.ceil(rating / 3);
						res.augmentations.push(augment);
					}
					switch (rating)
					{
						case 0:
						case 1:
							res.weapons.push(this.get_weapon('Ceska Black Scorpion'));
							break;
						case 2:
						case 3:
							res.weapons.push(this.get_weapon('FN P93 Praetor'));
							res.weapons.push(this.get_weapon('Ceska Black Scorpion'));
							break;
						case 4:
						case 5:
						case 6:
							res.weapons.push(this.get_weapon('FN HAR'));
							res.weapons.push(this.get_weapon('FN P93 Praetor'));
							res.weapons.push(this.get_weapon('Ceska Black Scorpion'));
							break;
					}
					break;

				case 'Dwarf':
					if (rating > 1)
					{
						augment = this.get_augmentation('Muscle Toner');
						augment.rating = roll.half(rating);
						res.augmentations.push(augment);
						augment = this.get_augmentation('Synaptic Booster');
						augment.rating = roll.half(rating - 1);
						res.augmentations.push(augment);
						res.weapons.push(this.get_weapon('Combat Knife'));
					}

					augment = this.get_augmentation('Orthoskin');
					augment.rating = roll.half(rating + 2);
					res.augmentations.push(augment);
					augment = this.get_augmentation('Bone Density Augmentation');
					augment.rating = roll.half(rating + 2);
					res.augmentations.push(augment);

					switch (rating)
					{
						case 0:
						case 1:
							res.weapons.push(this.get_weapon('Ceska Black Scorpion'));
							break;
						case 2:
						case 3:
							res.weapons.push(this.get_weapon('HK-227'));
							res.weapons.push(this.get_weapon('Remington Roomsweeper'));
							break;
						case 4:
						case 5:
						case 6:
							res.weapons.push(this.get_weapon('Ares Alpha'));
							res.weapons.push(this.get_weapon('HK-227'));
							res.weapons.push(this.get_weapon('Ceska Black Scorpion'));
							break;
					}
					break;

				case 'Ork':
					if (rating > 1)
					{
						augment = this.get_augmentation('Muscle Toner');
						augment.rating = roll.half(rating);
						res.augmentations.push(augment);
						augment = this.get_augmentation('Muscle Augmentation');
						augment.rating = roll.half(rating);
						res.augmentations.push(augment);
						augment = this.get_augmentation('Synaptic Booster');
						augment.rating = roll.half(rating - 1);
						res.augmentations.push(augment);
						res.weapons.push(this.get_weapon('Sword'));
					}

					augment = this.get_augmentation('Orthoskin');
					augment.rating = roll.half(rating + 2);
					res.augmentations.push(augment);
					augment = this.get_augmentation('Bone Density Augmentation');
					augment.rating = roll.half(rating + 2);
					res.augmentations.push(augment);

					switch (rating)
					{
						case 0:
						case 1:
							res.weapons.push(this.get_weapon('Colt Cobra TZ-120'));
							break;
						case 2:
						case 3:
							res.weapons.push(this.get_weapon('Colt Cobra TZ-120'));
							res.weapons.push(this.get_weapon('Browning Ultra-Power'));
							break;
						case 4:
						case 5:
						case 6:
							res.weapons.push(this.get_weapon('AK-97'));
							res.weapons.push(this.get_weapon('Colt Cobra TZ-120'));
							res.weapons.push(this.get_weapon('Steyr TMP'));
							break;
					}
					break;

				case 'Troll':
					if (rating > 1)
					{
						augment = this.get_augmentation('Muscle Toner');
						augment.rating = roll.half(rating);
						res.augmentations.push(augment);
						augment = this.get_augmentation('Muscle Augmentation');
						augment.rating = roll.half(rating);
						res.augmentations.push(augment);
						augment = this.get_augmentation('Synaptic Booster');
						augment.rating = roll.half(rating - 1);
						res.augmentations.push(augment);
						res.weapons.push(this.get_weapon('Combat Axe'));
					}

					augment = this.get_augmentation('Orthoskin');
					augment.rating = roll.half(rating + 2);
					res.augmentations.push(augment);
					augment = this.get_augmentation('Bone Density Augmentation');
					augment.rating = roll.half(rating + 2);
					res.augmentations.push(augment);

					switch (rating)
					{
						case 0:
						case 1:
							res.weapons.push(this.get_weapon('Steyr TMP'));
							break;
						case 2:
						case 3:
							res.weapons.push(this.get_weapon('Colt Cobra TZ-120'));
							res.weapons.push(this.get_weapon('Steyr TMP'));
							break;
						case 4:
						case 5:
						case 6:
							res.weapons.push(this.get_weapon('Ingram Valiant'));
							res.weapons.push(this.get_weapon('Colt Cobra TZ-120'));
							res.weapons.push(this.get_weapon('Steyr TMP'));
							break;
					}
					break;
			}

			if (rating < 4)
				res.gear.push(this.get_gear('Jazz'));
			else
				res.gear.push(this.get_gear('Kamikaze'));
		}

		if (special_type === 'Tank')
		{
			// Attributes
			res.attributes.body = 2;
			res.attributes.strength = 2;

			// Skills
			res.skills['Close Combat'] = rating + 2;
			res.skills.Firearms = rating + 2;

			if (rating > 3)
			{
				res.augmentations.push(this.get_augmentation('Cyber Spur'));
			}
			// Qualities
			res.qualities.negative.push('Bad Rep');
			res.qualities.positive.push('Guts');

			// Weapon
			if (rating < 2)
				res.weapons.push(this.get_weapon('Club'));
			else
				res.weapons.push(this.get_weapon('Stun Baton'));

			if (rating < 3)
			{
				res.weapons.push(this.get_weapon('Defiance T-250'));
				res.weapons.push(this.get_weapon('Browning Ultra-Power'));
			}
			else
			{
				res.weapons.push(this.get_weapon('Mossberg CMDT'));
				res.weapons.push(this.get_weapon('Remington Roomsweeper'));
			}

			// Armor
			if (rating < 4)
				res.armor = 'Armor Jacket';
			else if (rating < 6)
				res.armor = 'Full Body Armor';
			else
				res.armor = 'Full Body Armor w/ Helmet & Chemical Seal';

			// Augmentations & Drugs
			var augment, armor;

			augment = res.augmentations.find(function (aug)
			{
				return aug.name === 'Cybereyes';
			});

			if (!augment)
			{
				augment = this.get_augmentation('Cybereyes');
				augment.rating = 2;
				res.augmentations.push(augment);
			}

			if (rating > 2)
			{
				augment = this.get_augmentation('Orthoskin');
				augment.rating = rating - 2;
				res.augmentations.push(augment);
			}

			if (rating > 4)
			{
				augment = this.get_augmentation('Bone Lacing');
				augment.rating = rating - 4;
				res.augmentations.push(augment);
			}

			if (rating > 0)
			{
				armor = (rating > 3) ? 3 : rating;
				augment = this.get_augmentation('Cyberarm (Left)');
				augment.bonus_armor = armor;
				if (!augment.hasOwnProperty('augments'))
					augment.augments = [];
				augment.augments.push('Armor ' + armor);
				res.augmentations.push(augment);
			}

			if (rating > 3)
			{
				armor = rating - 3;
				augment = this.get_augmentation('Cyberarm (Right)');
				augment.bonus_armor = armor;
				if (!augment.hasOwnProperty('augments'))
					augment.augments = [];
				augment.augments.push('Armor ' + armor);
				res.augmentations.push(augment);
			}
		}

		if (special_type === 'Shaman')
		{
			// Attributes
			res.attributes.will = 1;
			res.attributes.charisma = 1;

			// Skills
			res.skills.Astral = rating + 2;
			res.skills.Conjuring = rating + 2;
			res.skills.Sorcery = rating + 2;

			// Qualities
			res.qualities.positive.push('Magician (Shaman)');
			if (rating > 3)
			{
				res.qualities.positive.push('Focused Concentration ' + (rating - 2));
			}

			// Gear
			res.gear.push({
				name: 'Psyche',
				quantity: 2
			});
			res.gear.push({
				name: 'Novacoke',
				quantity: 2
			});
			res.gear.push({
				name: 'Spellcasting focus (Summoning)',
				magic_focus: true,
				rating: rating
			});

			if (rating > 3)
			{
				res.gear.push({
					name: 'Power focus',
					magic_focus: true,
					rating: rating - 3
				});
			}

			// Specials : Spells
			res.special.Magic = (rating < 2) ? 2 : rating;
			res.special.spells = ['Manabolt', 'Ice Sheet', 'Ball Lightning'];
			switch (rating)
			{
				case 6:
					res.special.spells.push('Mindlink', 'Chaos');
				case 5:
					res.special.spells.push('Mind Probe', 'Trid Phantasm');
				case 4:
					res.special.spells.push('Increase Reflexes', 'Combat Sense');
				case 3:
					res.special.spells.push('Heal');
				case 2:
					res.special.spells.push('Detect Magic');
				case 1:
					res.special.spells.push('Invisibility');
				default:
					break;
			}
		}

		return res;
	},

	get_metatype_adjustment: function(race)
	{
		var res = {
			attributes: {body: 0, agility: 0, reaction: 0, strength: 0, will: 0, logic: 0, intuition: 0, charisma: 0},
			min_attributes: {body: 1, agility: 1, reaction: 1, strength: 1, will: 1, logic: 1, intuition: 1, charisma: 1},
			max_attributes: {body: 6, agility: 6, reaction: 6, strength: 6, will: 6, logic: 6, intuition: 6, charisma: 6},
			augmentations: []
		};

		switch (race)
		{
			case 'Human':
				break;

			case 'Elf':
				res.attributes.agility = 1;
				res.min_attributes.agility = 2;
				res.max_attributes.agility = 7;
				res.attributes.charisma = 2;
				res.min_attributes.charisma = 3;
				res.max_attributes.charisma = 8;
				break;

			case 'Dwarf':
				res.attributes.body = 2;
				res.min_attributes.body = 3;
				res.max_attributes.body = 8;
				res.attributes.reaction = -1;
				res.min_attributes.reaction = 1;
				res.max_attributes.reaction = 5;
				res.attributes.strength = 2;
				res.min_attributes.strength = 3;
				res.max_attributes.strength = 8;
				res.attributes.will = 1;
				res.min_attributes.will = 2;
				res.max_attributes.will = 7;
				break;

			case 'Ork':
				res.attributes.body = 3;
				res.min_attributes.body = 4;
				res.max_attributes.body = 9;
				res.attributes.strength = 2;
				res.min_attributes.strength = 3;
				res.max_attributes.strength = 8;
				res.attributes.logic = -1;
				res.min_attributes.logic = 1;
				res.max_attributes.logic = 5;
				res.attributes.charisma = -1;
				res.min_attributes.charisma = 1;
				res.max_attributes.charisma = 5;
				break;

			case 'Troll':
				res.attributes.body = 4;
				res.min_attributes.body = 5;
				res.max_attributes.body = 10;
				res.attributes.agility = -1;
				res.min_attributes.agility = 1;
				res.max_attributes.agility = 5;
				res.attributes.strength = 4;
				res.min_attributes.strength = 5;
				res.max_attributes.strength = 10;
				res.attributes.logic = -1;
				res.min_attributes.logic = 1;
				res.max_attributes.logic = 5;
				res.attributes.intuition = -1;
				res.min_attributes.intuition = 1;
				res.max_attributes.intuition = 5;
				res.attributes.charisma = -2;
				res.min_attributes.charisma = 1;
				res.max_attributes.charisma = 4;
				res.augmentations.push({name: 'Troll Dermal Deposits'});
				break;

			case 'Special':
				res.max_attributes.agility = 30;
				res.max_attributes.body = 30;
				res.max_attributes.reaction = 30;
				res.max_attributes.strength = 30;
				res.max_attributes.will = 30;
				res.max_attributes.logic = 30;
				res.max_attributes.intuition = 30;
				res.max_attributes.charisma = 30;
				break;

			default:
				console.log('ERROR: get_metatype_adjustment() with no known metatype');
				res = false;
				break;
		}

		return res;
	},

	get_armor_list: function()
	{
		return {
			'Synth-Leather': 4,
			'Actioneer Business Clothes': 8,
			'Armor Clothing': 6,
			'Armor Jacket': 12,
			'Armor Vest': 9,
			'Chameleon Suit': 9,
			'Full Body Armor': 15,
			'Full Body Armor w/ Helmet & Chemical Seal': 18,
			'Lined Coat': 9,
			'Urban Explorer Jumpsuit': 9
		};
	},

	get_quality_list: function()
	{
		return {
			positive: [
				'Ambidextrous',
				'Analytical Mind',
				'Astral Chameleon',
				'Blandness',
				'First Impression',
				'Gearhead',
				'Guts',
				'Human-Looking',
				'Lucky',
				'Magical Resistance I',
				'Photographic Memory',
				'Toughness',
				'Will to Live I'
			],
			negative: [
				'Bad Luck',
				'Bad Rep',
				'Combat Paralysis',
				'Dependent(s) I',
				'Distinctive Style',
				'Elf Poser',
				'Gremlins I',
				'Insomnia I',
				'Loss of Confidence',
				'Ork Poser',
				'Scorched (BTLs)',
				'Sensitive System',
				'Social Stress',
				'Uncouth',
				'Uneducated'
			]
		};
	},

	get_skill_list: function()
	{
		return [
			'Astral',
			'Athletics',
			'Biotech',
			'Close Combat',
			'Con',
			'Conjuring',
			'Cracking',
			'Electronics',
			'Enchanting',
			'Engineering',
			'Exotic Melee Weapons',
			'Exotic Ranged Weapons',
			'Firearms',
			'Influence',
			'Outdoors',
			'Perception',
			'Piloting',
			'Sorcery',
			'Stealth',
			'Tasking'
		];
	},

	_augmentation_list: [
		{
			name: 'Bone Density Augmentation',
			essence: 0.3,
			max_rating: 4
		},
		{
			name: 'Bone Lacing',
			essence: 0.5,
			max_rating: 3
		},
		{
			name: 'Cerebellum Booster',
			essence: 0.2,
			max_rating: 2
		},
		{
			name: 'Cerebral Booster',
			essence: 0.2,
			max_rating: 3
		},
		{
			name: 'Cyberarm (Left)',
			essence: 1,
			type: 'full cyberlimb',
			sub_type: 'arm'
		},
		{
			name: 'Cyberarm (Right)',
			essence: 1,
			type: 'full cyberlimb',
			sub_type: 'arm'
		},
		{
			name: 'Cybereyes',
			essence: 0.1,
			max_rating: 4,
			augments: ['Flare Compensation', 'Image link', 'Smartlink', 'Thermographic vision', 'Low-light Vision']
		},
		{
			name: 'Cyberleg (Left)',
			essence: 1,
			type: 'full cyberlimb',
			sub_type: 'leg'
		},
		{
			name: 'Cyberleg (Right)',
			essence: 1,
			type: 'full cyberlimb',
			sub_type: 'leg'
		},
		{
			name: 'Datajack',
			essence: 0.1
		},
		{
			name: 'Dermal Plating',
			essence: 0.5,
			max_rating: 6
		},
		{
			name: 'Internal Air Tank',
			essence: 0.5
		},
		{
			name: 'Muscle Augmentation',
			essence: 0.2,
			max_rating: 4
		},
		{
			name: 'Muscle Toner',
			essence: 0.2,
			max_rating: 4
		},
		{
			name: 'Orthoskin',
			essence: 0.25,
			max_rating: 4
		},
		{
			name: 'Cyber Spur',
			essence: 0.3
		},
		{
			name: 'Synaptic Booster',
			essence: 0.5,
			max_rating: 3
		},
		{
			name: 'Wired Reflexes',
			max_rating: 3
		},
		{
			name: 'Troll Dermal Deposits',
			essence: 0,
			selectable: false
		},
		{
			name: 'Jazz (Active)',
			essence: 0,
			selectable: false
		},
		{
			name: 'Jazz (Crash)',
			essence: 0,
			selectable: false
		},
		{
			name: 'Kamikaze (Active)',
			essence: 0,
			selectable: false
		},
		{
			name: 'Kamikaze (Crash)',
			essence: 0,
			selectable: false
		},
		{
			name: 'Novacoke (Active)',
			essence: 0,
			selectable: false
		},
		{
			name: 'Psyche (Active)',
			essence: 0,
			selectable: false
		}
	],

	get_augmentation_list: function()
	{
		return this._augmentation_list.slice(0);
	},

	get_augmentation: function(name)
	{
		var augment = this._augmentation_list.find(function (aug)
		{
			return aug.name === name;
		});
		return $.extend({}, augment);
	},

	_weapon_list: [
		{
			name: 'Combat Axe',
			type: 'Melee',
			ability: 'Close Combat',
			ar: '9/-/-/-/-',
			dv: 5,
			damage_attribute: 'strength',
			ap: -4
		},

		{
			name: 'Combat Knife',
			type: 'Melee',
			ability: 'Close Combat',
			ar: '8/2*/-/-/-',
			dv: 3,
			damage_attribute: 'strength',
			ap: -3
		},

		{
			name: 'Knife',
			type: 'Melee',
			ability: 'Close Combat',
			ar: '6/1*/-/-/-',
			dv: 2,
			damage_attribute: 'strength',
			ap: -1
		},

		{
			name: 'Katana',
			type: 'Melee',
			ability: 'Close Combat',
			ar: '10/-/-/-/-',
			dv: 4,
			damage_attribute: 'strength',
			ap: -3,
			reach: 1
		},

		{
			name: 'Sword',
			type: 'Melee',
			ability: 'Close Combat',
			ar: '9/-/-/-/-',
			dv: 3,
			damage_attribute: 'strength',
			ap: -2,
			reach: 1
		},

		{
			name: 'Cyber Spur',
			type: 'Melee',
			ability: 'Close Combat',
			ar: '7/-/-/-/-',
			dv: 3,
			damage_attribute: 'strength',
			ap: -2
		},

		{
			name: 'Club',
			type: 'Melee',
			ability: 'Close Combat',
			ar: '6/-/-/-/-',
			dv: 3,
			damage_attribute: 'strength',
			reach: 1
		},

		{
			name: 'Stun Baton',
			type: 'Melee',
			ability: 'Close Combat',
			ar: '6/-/-/-/-',
			dv: 5,
			damage_type: 'S(e)',
			ap: -5,
			reach: 1
		},

		{
			name: 'Staff',
			type: 'Melee',
			ability: 'Close Combat',
			ar: '8/-/-/-/-',
			dv: 4,
			damage_attribute: 'strength',
			reach: 2
		},

		{
			name: 'Telescoping Staff',
			type: 'Melee',
			ability: 'Close Combat',
			ar: '8/-/-/-/-',
			dv: 4,
			damage_attribute: 'strength',
			reach: 2
		},

		{
			name: 'Defiance EX Shocker',
			type: 'Taser',
			ability: 'Firearms',
			ar: '10/6*/-/-/-',
			dv: 6,
			damage_type: 'S(e)',
			ap: -5,
			modes: 'SS',
			ammo_count: 4,
			reload: 'm'
		},

		{
			name: 'Streetline Special',
			type: 'Hold-out Pistol',
			ability: 'Firearms',
			ar: '8/8/-/-/-',
			dv: 2,
			modes: 'SS',
			ammo_count: 6,
			reload: 'c'
		},

		{
			name: 'Colt America L36',
			type: 'Light Pistol',
			ability: 'Firearms',
			ar: '8/8/6/-/-',
			dv: 2,
			modes: 'SA',
			ammo_count: 11,
			reload: 'c'
		},

		{
			name: 'Fichetti Security 600',
			type: 'Light Pistol',
			ability: 'Firearms',
			ar: '10/9/6/-/-',
			dv: 2,
			modes: 'SA',
			rc_modified: 1,
			ammo_count: 30,
			reload: 'c'
		},

		{
			name: 'Ares Predator VI',
			type: 'Heavy Pistol',
			ability: 'Firearms',
			ar: '10/10/8/-/-',
			dv: 3,
			ap: -1,
			modes: 'SA/BF',
			ammo_count: 15,
			reload: 'c'
		},

		{
			name: 'Browning Ultra-Power',
			type: 'Heavy Pistol',
			ability: 'Firearms',
			ar: '10/9/6/-/-',
			dv: 3,
			ap: -1,
			modes: 'SA',
			ammo_count: 10,
			reload: 'c'
		},

		{
			name: 'Remington Roomsweeper',
			type: 'Shotgun',
			ability: 'Firearms',
			ar: '9/8/4/-/-',
			dv: 5,
			ap: -1,
			modes: 'SA',
			ammo_count: 8,
			reload: 'm'
		},

		{
			name: 'Ceska Black Scorpion',
			type: 'Machine Pistol',
			ability: 'Firearms',
			ar: '10/9/8/-/-',
			dv: 2,
			modes: 'SA/BF',
			rc_modified: 1,
			ammo_count: 35,
			reload: 'c'
		},

		{
			name: 'Steyr TMP',
			type: 'Machine Pistol',
			ability: 'Firearms',
			ar: '8/8/6/-/-',
			dv: 2,
			modes: 'SA/BF/FA',
			ammo_count: 30,
			reload: 'c'
		},

		{
			name: 'Colt Cobra TZ-120',
			type: 'SMG',
			ability: 'Firearms',
			ar: '10/11/8/-/-',
			dv: 3,
			modes: 'SA/BF',
			rc: 2,
			rc_modified: 3,
			ammo_count: 32,
			reload: 'c'
		},

		{
			name: 'FN P93 Praetor',
			type: 'SMG',
			ability: 'Firearms',
			ar: '9/12/7/-/-',
			dv: 4,
			modes: 'SA/BF/FA',
			rc: 1,
			rc_modified: 2,
			ammo_count: 50,
			reload: 'c'
		},

		{
			name: 'HK-227',
			type: 'SMG',
			ability: 'Firearms',
			ar: '10/11/8/-/-',
			dv: 3,
			modes: 'SA/BF',
			rc_modified: 1,
			ammo_count: 28,
			reload: 'c'
		},

		{
			name: 'AK-97',
			type: 'Assault Rifle',
			ability: 'Firearms',
			ar: '4/11/9/7/1',
			dv: 5,
			ap: -2,
			modes: 'SA/BF/FA',
			ammo_count: 38,
			reload: 'c'
		},

		{
			name: 'Ares Alpha',
			type: 'Assault Rifle',
			ability: 'Firearms',
			ar: '4/10/9/7/2',
			dv: 4,
			ap: -2,
			modes: 'SA/BF/FA',
			rc: 2,
			ammo_count: 42,
			reload: 'c'
		},

		{
			name: 'FN HAR',
			type: 'Assault Rifle',
			ability: 'Firearms',
			ar: '3/11/10/6/1',
			dv: 5,
			ap: -2,
			modes: 'SA/BF/FA',
			rc: 2,
			ammo_count: 35,
			reload: 'c'
		},

		{
			name: 'Cavalier Arms Crockett EBR',
			type: 'Sniper Rifle',
			ability: 'Firearms',
			ar: '3/8/11/8/8',
			dv: 5,
			ap: -3,
			modes: 'SA/BF',
			rc_modified: 1,
			ammo_count: 20,
			reload: 'c'
		},

		{
			name: 'Defiance T-250',
			type: 'Shotgun',
			ability: 'Firearms',
			ar: '7/10/6/-/-',
			dv: 4,
			ap: -1,
			modes: 'SS/SA',
			ammo_count: 5,
			reload: 'm'
		},

		{
			name: 'Mossberg CMDT',
			type: 'Shotgun',
			ability: 'Firearms',
			ar: '4/11/7/-/-',
			dv: 4,
			ap: -1,
			modes: 'SA/BF',
			ammo_count: 10,
			reload: 'c'
		},

		{
			name: 'Ingram Valiant',
			type: 'LMG',
			ability: 'Exotic Ranged Weapons',
			ar: '2/11/12/7/3',
			dv: 4,
			ap: -2,
			modes: 'SA/BF/FA',
			ammo_count: 50,
			reload: 'c'
		},

		{
			name: 'Panther XXL',
			type: 'Assault Cannon',
			ability: 'Exotic Ranged Weapons',
			ar: '1/9/12/8/6',
			dv: 7,
			ap: -6,
			modes: 'SA',
			ammo_count: 15,
			reload: 'c'
		}
	],

	get_weapon_list: function()
	{
		var list = this._weapon_list.map(function (i)
		{
			return i.name;
		});

		list.sort();

		return list;
	},

	get_weapon: function(name)
	{
		var data = {
			name: name, // Display name of the weapon: Knife, Ares Predator V, etc.
			type: '', // Display type of the weapon: Light Pistol, SMG, etc.
			ability: '', // Linked ability: Close Combat, Firearms, etc.
			ar: '-/-/-/-/-', // Attack Rating value at each range category
			dv: '', // Damage Value
			damage_type: 'P', // Physical, Stun, Stun(electrical)
			damage_attribute: null, // If damage is linked to STR instead of bullet type
			ap: 0,
			modes: '',
			rc: 0, // Base recoil compensation
			rc_modified: 0, // Conditional recoil compensation
			ammo_count: 0,
			reload: 'c', // Clip, Internal Magazine, etc.
			ammo_type: '', // Assume normal ammo unless specified
			reach: 0
		};

		var stock_weapon = this._weapon_list.find(function (i)
		{
			return name === i.name;
		});

		if (stock_weapon === undefined)
		{
			console.log('ERROR: get_weapon() with no known weapon name');
			return stock_weapon;
		}

		return $.extend(data, stock_weapon);
	},

	_gear_list: [
		{
			name: 'Sunglasses',
			rating: 2,
			augments: ['Image link', 'Smartlink', 'Low-light Vision']
		},
		{
			name: 'Goggles',
			rating: 2,
			augments: ['Image link', 'Smartlink', 'Thermographic Vision']
		},
		{
			name: 'Jazz',
			quantity: 2
		},
		{
			name: 'Kamikaze',
			quantity: 2
		},
		{
			name: 'Novacoke',
			quantity: 2
		},
		{
			name: 'Psyche',
			quantity: 2
		},
		{
			name: 'Reagents',
			quantity: 10
		},
		{
			name: 'Flashbang Grenade',
			quantity: 2
		},
		{
			name: 'Fragmentation Grenade',
			quantity: 1
		},
		{
			name: 'Gas Grenade (CS/Tear)',
			quantity: 2
		},
		{
			name: 'Smoke Grenade',
			quantity: 2
		},
		{
			name: 'Thermal Smoke Grenade',
			quantity: 2
		},
		{
			name: 'Grapple Gun'
		},
		{
			name: 'Bug Scanner',
			rating: 2
		},
		{
			name: 'Flashlight'
		},
		{
			name: 'Stim Patch',
			rating: 3,
			quantity: 2
		},
		{
			name: 'Trodes'
		}
	],

	get_gear_list: function()
	{
		return this._gear_list.slice(0);
	},

	get_gear: function(name)
	{
		var gear = this._gear_list.find(function (g)
		{
			return g.name === name;
		});
		return $.extend({}, gear);
	},

	get_skill_attributes: function (skill)
	{
		var data = {
			attribute: null
		};

		switch (skill)
		{
			// Agility based skills
			case 'Athletics':
			case 'Close Combat':
			case 'Exotic Melee Weapons':
			case 'Exotic Ranged Weapons':
			case 'Firearms':
			case 'Stealth':
				data.attribute = 'agility';
				break;

			// Reaction based skills
			case 'Piloting':
				data.attribute = 'reaction';
				break;

			// Charisma based social skills
			case 'Con':
			case 'Influence':
				data.attribute = 'charisma';
				break;

			// Logic based skills
			case 'Biotech':
			case 'Cracking':
			case 'Electronics':
			case 'Engineering':
				data.attribute = 'logic';
				break;

			// Intuition based mental skills
			case 'Outdoors':
			case 'Perception':
				data.attribute = 'intuition';
				break;

			// Willpower based skills
			case 'Astral':
				data.attribute = 'will';
				break;

			// Magic based skills
			case 'Conjuring':
			case 'Enchanting':
			case 'Sorcery':
				data.attribute = 'magic';
				break;

			default:
				console.log('ERROR: get_skill_attributes() with unknown skill', skill);
		}

		return data;
	}
};
