..  include:: /Includes.rst.txt

=====
Modal
=====

Reopen the Klaro! modal
=======================

Klarokratie adds the field ``tx_klarokratie_open_modal`` to the TYPO3 ``pages``
table and provides the corresponding TCA configuration.

This field can be enabled in the page properties and used to render a menu item
that reopens the Klaro! modal instead of linking to a normal page.

Example Fluid markup:

..  code-block:: html

    <a class="nav-link {f:if(condition:'{menuItem.active}', then:'active')}"
       href="{f:if(condition:'{menuItem.data.tx_klarokratie_open_modal}', then:'#', else:'{menuItem.link}')}"
       {f:if(condition:'{menuItem.data.tx_klarokratie_open_modal}', then:'onclick="javascript:klaro.show(undefined, true);return false;"')}
       target="{menuItem.target}"
       title="{menuItem.title}"
       role="menuitem">
        <span>{title}</span>
    </a>
