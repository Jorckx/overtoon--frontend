<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:xhtml="http://www.w3.org/1999/xhtml">
	<xsl:output method="html" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html>
			<head>
				<title>Sitemap</title>
				<style>
					body { font: 15px/1.5 system-ui, sans-serif; margin: 2rem; color: #222; }
					table { border-collapse: collapse; width: 100%; }
					th, td { text-align: left; padding: .5rem .75rem; border-bottom: 1px solid #ddd; }
					th { background: #f5f5f5; }
					a { color: #0645ad; text-decoration: none; }
					a:hover { text-decoration: underline; }
				</style>
			</head>
			<body>
				<h1>Sitemap</h1>
				<table>
					<thead>
						<tr><th>URL</th><th>Last modified</th><th>Languages</th></tr>
					</thead>
					<tbody>
						<xsl:for-each select="sm:urlset/sm:url | sm:sitemapindex/sm:sitemap">
							<tr>
								<td><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
								<td><xsl:value-of select="sm:lastmod"/></td>
								<td>
									<xsl:for-each select="xhtml:link">
										<xsl:value-of select="@hreflang"/>
										<xsl:if test="position() != last()">, </xsl:if>
									</xsl:for-each>
								</td>
							</tr>
						</xsl:for-each>
					</tbody>
				</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
