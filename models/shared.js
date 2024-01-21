const { EmbedBuilder } = require('discord.js');
const Product = require('../models/product');
const { thumbnailURL, imageURL, wlEmoji, emoji1, emoji2, StoreName } = require('../config.json');

const sendStockMessage = async (message) => {
  try {
    const products = await Product.find();

    if (products.length === 0) {
      return message.reply('No products found in the database.');
    }

    const stockInfoEmbed = new EmbedBuilder()
      .setColor('#36393e')
      .setTitle('<a:emoji_5:1197417915243311114> REALTIME STOCK <a:emoji_5:1197417915243311114>\n<a:pin:1188551391715803237>Updated every purchase <a:pin:1188551391715803237>')
      .setImage(imageURL)
      .setTimestamp()
    .setFooter({ text: `${StoreName}` });

    products.forEach((product) => {
      stockInfoEmbed.addFields(
        {
          name: `<a:crownking:1188551473450205214> ${product.name.replace(/"/g, '')} <a:crownking:1188551473450205214>`,
          value: `${emoji1}  Code: **${product.code}**\n${emoji1}  Stock: **${product.stock}**\n${emoji1}  Price: **${product.price}** ${wlEmoji}\n<a:lineneon:1197235813918969866><a:lineneon:1197235813918969866><a:lineneon:1197235813918969866><a:lineneon:1197235813918969866><a:lineneon:1197235813918969866><a:lineneon:1197235813918969866><a:lineneon:1197235813918969866><a:lineneon:1197235813918969866><a:lineneon:1197235813918969866><a:lineneon:1197235813918969866><a:lineneon:1197235813918969866><a:lineneon:1197235813918969866>\n`,
          inline: false,
        }
      );
    });

    let sentMessage;

    if (!message._editedMessage) {
      // Send the initial stock message
      sentMessage = await message.channel.send({ embeds: [stockInfoEmbed] });
      message._editedMessage = sentMessage; // Store the initial message for editing
    } else {
      // Edit the existing message to update stock information
      sentMessage = await message._editedMessage.edit({ embeds: [stockInfoEmbed] });
    }

    return sentMessage; // Return the sent message object
  } catch (error) {
    console.error('Error:', error);
    return null; // Return null in case of an error
  }
};

module.exports = { sendStockMessage };
