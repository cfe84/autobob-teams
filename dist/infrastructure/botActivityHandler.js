"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_1 = require("botbuilder");
const BobService_1 = require("../domain/BobService");
class BotActivityHandler extends botbuilder_1.TeamsActivityHandler {
    constructor() {
        super();
    }
    /* Building a messaging extension search command is a two step process.
        (1) Define how the messaging extension will look and be invoked in the client.
            This can be done from the Configuration tab, or the Manifest Editor.
            Learn more: https://aka.ms/teams-me-design-search.
        (2) Define how the bot service will respond to incoming search commands.
            Learn more: https://aka.ms/teams-me-respond-search.
        
        NOTE:   Ensure the bot endpoint that services incoming messaging extension queries is
                registered with Bot Framework.
                Learn more: https://aka.ms/teams-register-bot.
    */
    // Invoked when the service receives an incoming search query.
    handleTeamsMessagingExtensionQuery(context, query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (query.parameters === undefined) {
                throw Error("Missing parameters");
            }
            const searchQuery = (query.parameters[0]).value;
            const bobService = new BobService_1.BobService();
            const correspondingExcerpts = bobService.search(searchQuery);
            const attachments = correspondingExcerpts.map((excerpt) => {
                const title = `${excerpt.title} (${excerpt.book})`;
                const heroCard = botbuilder_1.CardFactory.heroCard(title);
                const preview = botbuilder_1.CardFactory.heroCard(title);
                preview.content.tap = {
                    type: 'invoke', value: excerpt
                };
                return Object.assign(Object.assign({}, heroCard), { preview });
            });
            return {
                composeExtension: {
                    type: 'result',
                    attachmentLayout: 'list',
                    attachments: attachments
                }
            };
        });
    }
    // Invoked when the user selects an item from the search result list returned above.
    handleTeamsMessagingExtensionSelectItem(context, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const card = botbuilder_1.CardFactory.thumbnailCard(obj.title, obj.content);
            return {
                composeExtension: {
                    type: 'result',
                    attachmentLayout: 'list',
                    attachments: [card]
                }
            };
        });
    }
}
module.exports.BotActivityHandler = BotActivityHandler;
//# sourceMappingURL=BotActivityHandler.js.map