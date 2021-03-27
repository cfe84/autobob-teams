// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
    TurnContext,
    MessageFactory,
    TeamsActivityHandler,
    CardFactory,
    ActionTypes,
    MessagingExtensionQuery,
    MessagingExtensionResponse,
    MessagingExtensionParameter,
    Attachment,
    AppBasedLinkQuery
} from 'botbuilder'
import { BobService, Excerpt } from '../domain/BobService'

class BotActivityHandler extends TeamsActivityHandler {
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
    async handleTeamsMessagingExtensionQuery(context: TurnContext, query: MessagingExtensionQuery): Promise<MessagingExtensionResponse> {
        if (query.parameters === undefined) {
            throw Error("Missing parameters")
        }
        const searchQuery = (query.parameters[0]).value;
        const bobService = new BobService()

        const correspondingExcerpts = bobService.search(searchQuery)
        const attachments = correspondingExcerpts.map((excerpt: Excerpt) => {
            const title = `${excerpt.title} (${excerpt.book})`
            const heroCard = CardFactory.heroCard(title)
            const preview = CardFactory.heroCard(title)
            preview.content.tap = {
                type: 'invoke', value: excerpt
            }
            return { ...heroCard, preview };
        })

        return {
            composeExtension: {
                type: 'result',
                attachmentLayout: 'list',
                attachments: attachments
            }
        };
    }

    // Invoked when the user selects an item from the search result list returned above.
    async handleTeamsMessagingExtensionSelectItem(context: TurnContext, obj: Attachment[]): Promise<MessagingExtensionResponse> {
        const card = CardFactory.thumbnailCard((obj as any as Excerpt).title, (obj as any as Excerpt).content)
        return {
            composeExtension: {
                type: 'result',
                attachmentLayout: 'list',
                attachments: [card]
            }
        };
    }
}

module.exports.BotActivityHandler = BotActivityHandler;

